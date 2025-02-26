//функция удаления стилей с кнопок после ответа
export const removingButtonStyles = (countryButtonEls: NodeListOf<Element>) => {
    countryButtonEls.forEach(button => {
        button.removeAttribute('disabled')
        button.classList.remove('correctBtn', 'wrongBtn')
    })

}