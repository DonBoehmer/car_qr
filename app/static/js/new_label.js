/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/new_label.ts ***!
  \**************************/
console.log('new_label.ts');
var suggestionContainers = document.querySelectorAll('.suggestion-container');
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        console.log('Escape pressed');
        suggestionContainers.forEach(function (container) {
            container.classList.add('hidden');
        });
    }
});
var makeContainer = document.querySelector('.make-container');
var modelContainer = document.querySelector('.model-container');
var trimContainer = document.querySelector('.trim-container');
console.log('trimContainer', trimContainer);
var makeInput = document.querySelector('#make-1');
var modelInput = document.querySelector('#vehicle_model-1');
var trimInput = document.querySelector('#label-1-trim');
var makeSuggestionP = document.querySelector('.make-suggestion');
var modelSuggestionP = document.querySelector('.model-suggestion');
var trimSuggestionP = document.querySelector('.trim-suggestion');
function selectModel() {
    console.log('selectModel()');
    var suggestionsGot = document.querySelectorAll('.model-suggestion');
    suggestionsGot.forEach(function (suggestion) {
        suggestion.addEventListener('click', function (e) {
            console.log('Model suggestion clicked', e.target.innerHTML);
            modelInput.value = e.target.innerHTML.replace(/\s+/g, '');
            modelContainer.classList.add('hidden');
            console.log('modelInput.value', modelInput.value);
            // pull all trims for pulled models from db
            var trims = [];
            fetch('/labels/get_trims', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ modelSelected: modelInput.value }),
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                trims.push.apply(trims, data.trims);
                trimContainer.innerHTML = '';
                trims.forEach(function (trim) {
                    var clonedTrimSuggestionParagraph = trimSuggestionP.cloneNode(true);
                    clonedTrimSuggestionParagraph.innerHTML = trim;
                    trimContainer.appendChild(clonedTrimSuggestionParagraph);
                });
                // selectTrim();
            })
                .catch(function (error) {
                console.error('Error fetching trims by model:', error);
            });
            modelInput.addEventListener('click', function (e) {
                modelContainer.classList.remove('hidden');
            });
            // pull all trims for pulled models from db
        });
    });
}
if (makeInput) {
    makeInput.addEventListener('input', function (e) {
        var makes = [];
        fetch('/labels/get_makes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ makeTyped: e.target.value }),
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            makes.push.apply(makes, data.makes);
            makeContainer.classList.remove('hidden');
            makeContainer.innerHTML = '';
            makes.forEach(function (make) {
                var clonedMakeSuggestionParagraph = makeSuggestionP.cloneNode(true);
                clonedMakeSuggestionParagraph.innerHTML = make;
                makeContainer.appendChild(clonedMakeSuggestionParagraph);
            });
            var suggestionsGot = document.querySelectorAll('.make-suggestion');
            suggestionsGot.forEach(function (suggestion) {
                suggestion.addEventListener('click', function (e) {
                    console.log('Make suggestion clicked', e.target.innerHTML);
                    makeInput.value = e.target.innerHTML;
                    makeContainer.classList.add('hidden');
                    console.log('makeInput.value', makeInput.value);
                    var models = [];
                    fetch('/labels/get_models', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ makeSelected: makeInput.value }),
                    })
                        .then(function (response) { return response.json(); })
                        .then(function (data) {
                        models.push.apply(models, data.models);
                        modelContainer.innerHTML = '';
                        models.forEach(function (model) {
                            var clonedModelSuggestionParagraph = modelSuggestionP.cloneNode(true);
                            clonedModelSuggestionParagraph.innerHTML = model;
                            modelContainer.appendChild(clonedModelSuggestionParagraph);
                        });
                    })
                        .catch(function (error) {
                        console.error('Error fetching models by make:', error);
                    });
                    modelInput.addEventListener('click', function (e) {
                        modelContainer.classList.remove('hidden');
                        selectModel();
                    });
                });
            });
        })
            .catch(function (error) {
            console.error('Error sending makes data to Flask:', error);
        });
    });
}
makeInput.addEventListener('click', function (e) {
    makeContainer.classList.toggle('hidden');
});
modelInput.addEventListener('click', function (e) {
    modelContainer.classList.toggle('hidden');
});
trimInput.addEventListener('click', function (e) {
    console.log('trimInput clicked');
    trimContainer.classList.toggle('hidden');
});
if (modelInput) {
    modelInput.addEventListener('input', function (e) {
        var models = [];
        fetch('/labels/get_models', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ modelTyped: modelInput.value }),
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            models.push.apply(models, data.models);
            modelContainer.innerHTML = '';
            models.forEach(function (model) {
                var clonedModelSuggestionParagraph = modelSuggestionP.cloneNode(true);
                clonedModelSuggestionParagraph.innerHTML = model;
                modelContainer.appendChild(clonedModelSuggestionParagraph);
            });
            console.log('before SelectModel()');
            selectModel();
        })
            .catch(function (error) {
            console.error('Error fetching all models:', error);
        });
    });
}
selectModel();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eUIsQ0FBQztnQkFDM0QsOEJBQThCLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDakQsY0FBYyxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3BDLFdBQVcsRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxlQUFLO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0NBQ0o7QUFFRCxXQUFXLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9uZXdfbGFiZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ25ld19sYWJlbC50cycpO1xuXG5jb25zdCBzdWdnZXN0aW9uQ29udGFpbmVyczogTm9kZUxpc3RPZjxIVE1MRGl2RWxlbWVudD4gPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3VnZ2VzdGlvbi1jb250YWluZXInKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgY29uc29sZS5sb2coJ0VzY2FwZSBwcmVzc2VkJyk7XG4gICAgc3VnZ2VzdGlvbkNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xuICB9XG59KTtcblxuY29uc3QgbWFrZUNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFrZS1jb250YWluZXInKTtcbmNvbnN0IG1vZGVsQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1jb250YWluZXInKTtcbmNvbnN0IHRyaW1Db250YWluZXI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyaW0tY29udGFpbmVyJyk7XG5jb25zb2xlLmxvZygndHJpbUNvbnRhaW5lcicsIHRyaW1Db250YWluZXIpO1xuY29uc3QgbWFrZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21ha2UtMScpO1xuY29uc3QgbW9kZWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjdmVoaWNsZV9tb2RlbC0xJyxcbikgYXMgSFRNTElucHV0RWxlbWVudDtcbmNvbnN0IHRyaW1JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsYWJlbC0xLXRyaW0nKTtcbmNvbnN0IG1ha2VTdWdnZXN0aW9uUDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFrZS1zdWdnZXN0aW9uJyk7XG5jb25zdCBtb2RlbFN1Z2dlc3Rpb25QOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdWdnZXN0aW9uJyk7XG5jb25zdCB0cmltU3VnZ2VzdGlvblA6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyaW0tc3VnZ2VzdGlvbicpO1xuXG5mdW5jdGlvbiBzZWxlY3RNb2RlbCgpIHtcbiAgY29uc29sZS5sb2coJ3NlbGVjdE1vZGVsKCknKTtcbiAgY29uc3Qgc3VnZ2VzdGlvbnNHb3Q6IE5vZGVMaXN0T2Y8SFRNTFBhcmFncmFwaEVsZW1lbnQ+ID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kZWwtc3VnZ2VzdGlvbicpO1xuICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAnTW9kZWwgc3VnZ2VzdGlvbiBjbGlja2VkJyxcbiAgICAgICAgKGUudGFyZ2V0IGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50KS5pbm5lckhUTUwsXG4gICAgICApO1xuICAgICAgbW9kZWxJbnB1dC52YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudCkuaW5uZXJIVE1MLnJlcGxhY2UoXG4gICAgICAgIC9cXHMrL2csXG4gICAgICAgICcnLFxuICAgICAgKTtcbiAgICAgIG1vZGVsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgY29uc29sZS5sb2coJ21vZGVsSW5wdXQudmFsdWUnLCBtb2RlbElucHV0LnZhbHVlKTtcblxuICAgICAgLy8gcHVsbCBhbGwgdHJpbXMgZm9yIHB1bGxlZCBtb2RlbHMgZnJvbSBkYlxuICAgICAgbGV0IHRyaW1zOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICBmZXRjaCgnL2xhYmVscy9nZXRfdHJpbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21vZGVsU2VsZWN0ZWQ6IG1vZGVsSW5wdXQudmFsdWV9KSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgdHJpbXMucHVzaCguLi5kYXRhLnRyaW1zKTtcbiAgICAgICAgICB0cmltQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgIHRyaW1zLmZvckVhY2godHJpbSA9PiB7XG4gICAgICAgICAgICBsZXQgY2xvbmVkVHJpbVN1Z2dlc3Rpb25QYXJhZ3JhcGg6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID1cbiAgICAgICAgICAgICAgdHJpbVN1Z2dlc3Rpb25QLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICAgICAgICAgIGNsb25lZFRyaW1TdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IHRyaW07XG4gICAgICAgICAgICB0cmltQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZFRyaW1TdWdnZXN0aW9uUGFyYWdyYXBoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIHNlbGVjdFRyaW0oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB0cmltcyBieSBtb2RlbDonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgICBtb2RlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIG1vZGVsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHB1bGwgYWxsIHRyaW1zIGZvciBwdWxsZWQgbW9kZWxzIGZyb20gZGJcbiAgICB9KTtcbiAgfSk7XG59XG5cbmlmIChtYWtlSW5wdXQpIHtcbiAgbWFrZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZSA9PiB7XG4gICAgbGV0IG1ha2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZmV0Y2goJy9sYWJlbHMvZ2V0X21ha2VzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21ha2VUeXBlZDogKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlfSksXG4gICAgfSlcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIG1ha2VzLnB1c2goLi4uZGF0YS5tYWtlcyk7XG4gICAgICAgIG1ha2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIG1ha2VDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1ha2VzLmZvckVhY2gobWFrZSA9PiB7XG4gICAgICAgICAgbGV0IGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gICAgICAgICAgICBtYWtlU3VnZ2VzdGlvblAuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgICAgICAgIGNsb25lZE1ha2VTdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IG1ha2U7XG4gICAgICAgICAgbWFrZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZWRNYWtlU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN1Z2dlc3Rpb25zR290OiBOb2RlTGlzdE9mPEhUTUxQYXJhZ3JhcGhFbGVtZW50PiA9XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1ha2Utc3VnZ2VzdGlvbicpO1xuICAgICAgICBzdWdnZXN0aW9uc0dvdC5mb3JFYWNoKHN1Z2dlc3Rpb24gPT4ge1xuICAgICAgICAgIHN1Z2dlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAnTWFrZSBzdWdnZXN0aW9uIGNsaWNrZWQnLFxuICAgICAgICAgICAgICAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYWtlSW5wdXQudmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQpLmlubmVySFRNTDtcbiAgICAgICAgICAgIG1ha2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWFrZUlucHV0LnZhbHVlJywgbWFrZUlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIGxldCBtb2RlbHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgICAgICAgIGZldGNoKCcvbGFiZWxzL2dldF9tb2RlbHMnLCB7XG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21ha2VTZWxlY3RlZDogbWFrZUlucHV0LnZhbHVlfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGVscy5wdXNoKC4uLmRhdGEubW9kZWxzKTtcbiAgICAgICAgICAgICAgICBtb2RlbENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICBtb2RlbHMuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoOiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsU3VnZ2VzdGlvblAuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IG1vZGVsO1xuICAgICAgICAgICAgICAgICAgbW9kZWxDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBtb2RlbHMgYnkgbWFrZTonLCBlcnJvcik7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgIG1vZGVsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICBzZWxlY3RNb2RlbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgbWFrZXMgZGF0YSB0byBGbGFzazonLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG59XG5cbm1ha2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICBtYWtlQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xufSk7XG5cbm1vZGVsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgbW9kZWxDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG59KTtcblxudHJpbUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIGNvbnNvbGUubG9nKCd0cmltSW5wdXQgY2xpY2tlZCcpO1xuICB0cmltQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xufSk7XG5cbmlmIChtb2RlbElucHV0KSB7XG4gIG1vZGVsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBlID0+IHtcbiAgICBsZXQgbW9kZWxzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZmV0Y2goJy9sYWJlbHMvZ2V0X21vZGVscycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHttb2RlbFR5cGVkOiBtb2RlbElucHV0LnZhbHVlfSksXG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBtb2RlbHMucHVzaCguLi5kYXRhLm1vZGVscyk7XG4gICAgICAgIG1vZGVsQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBtb2RlbHMuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAgICAgbGV0IGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPVxuICAgICAgICAgICAgbW9kZWxTdWdnZXN0aW9uUC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgICAgICAgY2xvbmVkTW9kZWxTdWdnZXN0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9IG1vZGVsO1xuICAgICAgICAgIG1vZGVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZE1vZGVsU3VnZ2VzdGlvblBhcmFncmFwaCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdiZWZvcmUgU2VsZWN0TW9kZWwoKScpO1xuICAgICAgICBzZWxlY3RNb2RlbCgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGFsbCBtb2RlbHM6JywgZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG5zZWxlY3RNb2RlbCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9