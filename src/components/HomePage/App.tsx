import { useState } from 'react'
import { DifficultyType, IQuestion } from '../../interfaces/app.interface'
import { useQuestions } from '../../hooks/useQuestions'
import { useQueryClient } from "@tanstack/react-query"
import { endingQuiz } from '../../utils/endingQuiezFnc'
import { removingButtonStyles } from '../../utils/removingButtonStyles'

export function App() {
  const queryClient = useQueryClient()
  const countryButtonEls = document.querySelectorAll('.coutryButton')
  const [difficulty, setDifficulty] = useState<DifficultyType>('Easy')
  const [currentFlagId, setCurrentFlagId] = useState<number>(0)
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  const { data } = useQuestions(difficulty)
  const question: IQuestion = (data?.[currentFlagId] as IQuestion)
  const quizLength: number = (data?.length as number)



  //функция перехода к следующему вопросу
  const nextQuestion = (e: React.FormEvent) => {
    if (currentFlagId >= quizLength - 1) {   //проверка есть ли там еще вопросы
      endingQuiz(correctAnswers)         //если вопросов дальше нет то вызываем функцию оконачния квиза
    }
    e.preventDefault() //запрещаем странице обновлятся
    setCurrentFlagId(currentFlagId + 1) // увеличиваем текущий id вопроса
    queryClient.invalidateQueries() //запрашиваем даные с новым id вопроса
    removingButtonStyles(countryButtonEls) //убираем стили правельных/неправильных ответов
  }

  //обрабодчик ответов 
  const responseHandler = (e: React.MouseEvent) => {
    const response = e.currentTarget as HTMLInputElement//получаем текущую кнопку
    const responseValue = e.currentTarget.getAttribute('value')?.toString() //получаем значение где был сделан клик мышью
    if (responseValue === question?.country) {
      e.currentTarget.classList.add('correctBtn') //добовляем кнопке класс со стилями правильного ответа
      setCorrectAnswers(correctAnswers + 1) //увеличиваем счетчик правильных ответов
      response.classList.add('correctBtn') //добовляем кнопке класс со стилями правильного ответа
    } else {
      e.currentTarget.classList.add('wrongBtn') //добовляем кнопке класс со стилями неправильного ответа
      countryButtonEls.forEach(button => { //проходим по всем кнопкам 
        if (button.getAttribute('value')?.toString() === question.country) { //ищем правильный ответ
          button.classList.add('correctBtn') //добовляем кнопке класс со стилями правильного ответа
        }
      })
    }

    countryButtonEls.forEach(button => { button.setAttribute('disabled', 'disabled') })//дисаблим все кнопки чтоб нельзя бло вбрать другой ответ
  }

  //обработчик изменения сложности
  const changeDifficulty = () => {
    setDifficulty(difficulty === 'Easy' ? 'Hard' : 'Easy')
    setTimeout(() => {
      removingButtonStyles(countryButtonEls) //убираем стили правельных/неправильных ответов
      countryButtonEls.forEach(button => { button.removeAttribute('disabled') }) //включаем все кнопки обратно
      setCurrentFlagId(0) //возвращаем текущий id вопроса на первый
      setCorrectAnswers(0)//обнуляем количество правельных ответов
      queryClient.invalidateQueries()//запрашиваем данные с новым сложностью
    }, 10)
  }

  return (
    <div className='mainContainer'>
      <div>
        <div className='header'>
          <h2 className='difficultyTitle'>{difficulty}</h2>
        </div>
        <img className='questionImg' src={question?.src} alt='flag' />
        <div className='coutryButtons__box'>
          <button className='coutryButton' value={question?.optionOne} onClick={responseHandler} >{question?.optionOne}</button>
          <button className='coutryButton' value={question?.optionTwo} onClick={responseHandler} >{question?.optionTwo}</button>
          <button className='coutryButton' value={question?.optionThree} onClick={responseHandler} >{question?.optionThree}</button>
          <button className='coutryButton' value={question?.optionFour} onClick={responseHandler} >{question?.optionFour}</button>
        </div>
        <form className='nextBtnContainer'>
          <button className='nextBtn' onClick={nextQuestion}>
            Next Flag
          </button>
        </form >
        <button className='ChangingDifficulty' onClick={changeDifficulty}>Change the difficulty  </button>
      </div>
    </div>
  )
}