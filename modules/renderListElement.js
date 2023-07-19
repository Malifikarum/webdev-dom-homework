import { initAnsverEvent } from "./initAnsverEvent.js";
import { initDeleteEvent } from "./initDeleteEvent.js";
import { initLikeEvent } from "./initLikeEvent.js";
import { initRedactorEvent } from "./initRedactorEvent.js";

export const renderListElement = ({ listElement, loaderCommentElement, formElement, listElementData, commentTextareaElement, nameInputElement }) => {
    listElement.innerHTML = listElementData
      .map((element, index) => {
        return `
          <li class="comment" data-index=${index}>
            <div class="comment-header">
              <div>${element.name}</div>
              <div>${element.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${element.comment 
            .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
            .replaceAll("QUOTE_END", "</div>")
                } 
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${(element.likeNumber)}</span>
                <button class="like-button ${(element.like) ? "-active-like" : ""}" data-index=${index}></button>
              </div>
              <div class="redactor">
                <button class="redactor-button" data-index=${index}>Реадактировать</button>
                <button class="delete-button" data-index=${index}>Удалить</button>
              </div>
            </div>
          </li>`
      }).join('');

    initLikeEvent({ listElement, listElementData, loaderCommentElement, formElement, commentTextareaElement, nameInputElement });
    initRedactorEvent({ listElement, listElementData, loaderCommentElement, formElement, commentTextareaElement, nameInputElement });
    initDeleteEvent({ listElement, listElementData, loaderCommentElement, formElement, commentTextareaElement, nameInputElement });
    initAnsverEvent({ listElement, listElementData, loaderCommentElement, formElement, commentTextareaElement, nameInputElement });
}