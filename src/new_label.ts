console.log('new_label.ts');

const suggestionContainers: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('.suggestion-container');

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    console.log('Escape pressed');
    suggestionContainers.forEach(container => {
      container.classList.add('hidden');
    });
  }
});

const makeContainer: HTMLDivElement = document.querySelector('.make-container');
const modelContainer: HTMLDivElement =
  document.querySelector('.model-container');
const trimContainer: HTMLDivElement = document.querySelector('.trim-container');
const typeContainer: HTMLDivElement = document.querySelector('.type-container');

const makeInput: HTMLInputElement = document.querySelector('#make-1');
const modelInput = document.querySelector(
  '#vehicle_model-1',
) as HTMLInputElement;
const trimInput: HTMLInputElement = document.querySelector('#label-1-trim');
const typeInput: HTMLInputElement = document.querySelector('#label-1-type');

const makeSuggestionP: HTMLParagraphElement =
  document.querySelector('.make-suggestion');
const modelSuggestionP: HTMLParagraphElement =
  document.querySelector('.model-suggestion');
const trimSuggestionP: HTMLParagraphElement =
  document.querySelector('.trim-suggestion');
const typeSuggestionP: HTMLParagraphElement =
  document.querySelector('.type-suggestion');

function selectMake() {
  const suggestionsGot: NodeListOf<HTMLParagraphElement> =
    document.querySelectorAll('.make-suggestion');
  suggestionsGot.forEach(suggestion => {
    suggestion.addEventListener('click', e => {
      console.log(
        'Make suggestion clicked',
        (e.target as HTMLParagraphElement).innerHTML,
      );
      makeInput.value = (e.target as HTMLParagraphElement).innerHTML.trim();
      makeContainer.classList.add('hidden');
      console.log('makeInput.value', makeInput.value);
      let models: Array<string> = [];
      fetch('/labels/get_models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({makeSelected: makeInput.value}),
      })
        .then(response => response.json())
        .then(data => {
          models.push(...data.models);
          modelContainer.innerHTML = '';
          models.forEach(model => {
            let clonedModelSuggestionParagraph: HTMLParagraphElement =
              modelSuggestionP.cloneNode(true) as HTMLParagraphElement;
            clonedModelSuggestionParagraph.innerHTML = model;
            modelContainer.appendChild(clonedModelSuggestionParagraph);
          });
        })
        .catch(error => {
          console.error('Error fetching models by make:', error);
        });

      modelInput.addEventListener('click', e => {
        modelContainer.classList.remove('hidden');
        selectModel();
      });
    });
  });
}

function selectModel() {
  const suggestionsGot: NodeListOf<HTMLParagraphElement> =
    document.querySelectorAll('.model-suggestion');
  suggestionsGot.forEach(suggestion => {
    suggestion.addEventListener('click', e => {
      console.log(
        'Model suggestion clicked',
        (e.target as HTMLParagraphElement).innerHTML,
      );
      modelInput.value = (e.target as HTMLParagraphElement).innerHTML.trim();
      modelContainer.classList.add('hidden');
      console.log('modelInput.value', modelInput.value);

      let trims: Array<string> = [];
      fetch('/labels/get_trims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelSelected: modelInput.value}),
      })
        .then(response => response.json())
        .then(data => {
          trims.push(...data.trims);
          trimContainer.innerHTML = '';
          trims.forEach(trim => {
            let clonedTrimSuggestionParagraph: HTMLParagraphElement =
              trimSuggestionP.cloneNode(true) as HTMLParagraphElement;
            clonedTrimSuggestionParagraph.innerHTML = trim;
            trimContainer.appendChild(clonedTrimSuggestionParagraph);
          });

          makeInput.value = data.make;
          typeInput.value = data.type;

          selectTrim();
        })
        .catch(error => {
          console.error('Error fetching trims by model:', error);
        });

      modelInput.addEventListener('click', e => {
        modelContainer.classList.remove('hidden');
      });
    });
  });
}

function selectTrim() {
  const suggestionsGot: NodeListOf<HTMLParagraphElement> =
    document.querySelectorAll('.trim-suggestion');
  suggestionsGot.forEach(suggestion => {
    suggestion.addEventListener('click', e => {
      console.log(
        'Trim suggestion clicked',
        (e.target as HTMLParagraphElement).innerHTML,
      );
      trimInput.value = (e.target as HTMLParagraphElement).innerHTML.trim();
      trimContainer.classList.add('hidden');
      console.log('trimInput.value', trimInput.value);
    });
  });
}

function selectType() {
  const suggestionsGot: NodeListOf<HTMLParagraphElement> =
    document.querySelectorAll('.type-suggestion');
  suggestionsGot.forEach(suggestion => {
    suggestion.addEventListener('click', e => {
      console.log(
        'Type suggestion clicked',
        (e.target as HTMLParagraphElement).innerHTML,
      );
      typeInput.value = (e.target as HTMLParagraphElement).innerHTML;
      typeContainer.classList.add('hidden');
      console.log('typeInput.value', typeInput.value);
    });
  });
}

if (makeInput) {
  makeInput.addEventListener('input', e => {
    let makes: Array<string> = [];
    fetch('/labels/get_makes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({makeTyped: (e.target as HTMLInputElement).value}),
    })
      .then(res => res.json())
      .then(data => {
        makes.push(...data.makes);
        makeContainer.classList.remove('hidden');
        makeContainer.innerHTML = '';
        makes.forEach(make => {
          let clonedMakeSuggestionParagraph: HTMLParagraphElement =
            makeSuggestionP.cloneNode(true) as HTMLParagraphElement;
          clonedMakeSuggestionParagraph.innerHTML = make;
          makeContainer.appendChild(clonedMakeSuggestionParagraph);
        });

        selectMake();
      })
      .catch(error => {
        console.error('Error sending makes data to Flask:', error);
      });
  });
}

makeInput.addEventListener('click', e => {
  makeContainer.classList.toggle('hidden');
});

modelInput.addEventListener('click', e => {
  modelContainer.classList.toggle('hidden');
});

trimInput.addEventListener('click', e => {
  console.log('trimInput clicked');
  trimContainer.classList.toggle('hidden');
});

typeInput.addEventListener('click', e => {
  console.log('typeInput clicked');
  console.log(typeContainer);
  typeContainer.classList.toggle('hidden');
});

if (modelInput) {
  modelInput.addEventListener('input', e => {
    let models: Array<string> = [];
    fetch('/labels/get_models', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({modelTyped: modelInput.value}),
    })
      .then(response => response.json())
      .then(data => {
        models.push(...data.models);
        modelContainer.innerHTML = '';
        models.forEach(model => {
          let clonedModelSuggestionParagraph: HTMLParagraphElement =
            modelSuggestionP.cloneNode(true) as HTMLParagraphElement;
          clonedModelSuggestionParagraph.innerHTML = model;
          modelContainer.appendChild(clonedModelSuggestionParagraph);
        });

        console.log('before SelectModel()');
        selectModel();
      })
      .catch(error => {
        console.error('Error fetching all models:', error);
      });
  });
}

selectMake();
selectModel();
selectTrim();
