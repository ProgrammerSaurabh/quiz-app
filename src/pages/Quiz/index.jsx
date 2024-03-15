import React from 'react';

import { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../../components/Button';
import Option from '../../components/Option';

import _ from '../../data/questions.json';

const Quiz = () => {
  const [quiz, setQuiz] = useState(_);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];

  const prevHandler = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const skipHandler = () => {
    nextHandler(false);
  };

  const nextHandler = (validate = true) => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      if (
        validate &&
        currentQuestion.required &&
        answers[currentQuestion.id] == undefined
      ) {
        return toast.error(`Question ${currentQuestionIndex + 1} is required!`);
      }

      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const optionHandler = (option) => {
    if (answers[currentQuestion.id] === undefined) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
    }
  };

  const submitHandler = () => {
    const missed = quiz.questions
      .map((question, questionIndex) =>
        question.required && answers[question.id] === undefined
          ? `Question ${questionIndex + 1}`
          : null
      )
      .filter(Boolean);

    if (missed.length > 0) {
      return toast.error(`${missed.join(', ')} is required!`);
    }

    toast.success(JSON.stringify(answers));
  };

  const loadQuestionPaginator = () => {
    let result = {};

    quiz.questions.forEach((question) => {
      const answer = answers[question.id];

      const correctAnswer = question.options.find(
        (option) => option.correct
      )?.value;

      result[question.id] = answer != undefined && answer == correctAnswer;
    });

    return result;
  };

  const questionPaginator = loadQuestionPaginator();

  console.log({ questionPaginator });

  return (
    <div className='flex justify-center'>
      <div className=' lg:w-1/2 w-full mx-2 my-10'>
        <div className='flex justify-between items-center mb-4 mx-4 gap-2'>
          <h1 className='text-2xl text-ellipsis overflow-hidden'>
            {quiz.title}
          </h1>
          <p>
            {currentQuestionIndex + 1}/{quiz.questions.length}
          </p>
        </div>
        <div className='bg-white rounded-lg shadow-lg p-5 mx-2'>
          <h2 className='text-xl mb-2'>{currentQuestion.question}</h2>
          <hr className='mb-4' />
          <div className='flex flex-col justify-start'>
            {currentQuestion.options.map((option) => (
              <Option
                key={`question-${currentQuestion.id}-option-${option.id}`}
                label={option.label}
                value={option.value}
                onClick={() => optionHandler(option.value)}
                selected={answers[currentQuestion.id] == option.value}
                correct={
                  answers[currentQuestion.id] == option.value && option.correct
                }
                disabled={answers[currentQuestion.id] != undefined}
              />
            ))}
          </div>
          <hr className='my-4' />
          <div className='flex justify-between items-center mb-4'>
            <Button
              disabled={currentQuestionIndex == 0}
              label={'←'}
              classes={'py-3 px-6 rounded-[4px]'}
              title={'Previous'}
              onClick={prevHandler}
            ></Button>
            {currentQuestionIndex != quiz?.questions?.length - 1 ? (
              <div className='mr-2'>
                {answers[currentQuestion.id] === undefined && (
                  <Button
                    disabled={
                      currentQuestionIndex == quiz?.questions?.length - 1
                    }
                    label={'Skip'}
                    classes={'py-3 px-6 rounded-[4px] me-3'}
                    style='bg-gray-100 text-gray-400'
                    title={'Skip'}
                    onClick={skipHandler}
                  ></Button>
                )}
                <Button
                  disabled={currentQuestionIndex == quiz?.questions?.length - 1}
                  label={'→'}
                  classes={'py-3 px-6 rounded-[4px]'}
                  title={'Next'}
                  onClick={nextHandler}
                ></Button>
              </div>
            ) : (
              <Button
                label={'Submit'}
                classes={'py-3 px-6 rounded-[4px]'}
                title={'Submit'}
                onClick={submitHandler}
              ></Button>
            )}
          </div>
        </div>
        <div className='flex flex-row justify-start items-center my-4 mx-2 gap-2'>
          {quiz.questions.map((question, index) => (
            <div
              className={`p-2 px-4 ${
                answers[question.id] === undefined
                  ? 'bg-gray-100 text-gray-400'
                  : questionPaginator[question.id]
                  ? 'bg-primary text-white'
                  : 'bg-red-700 text-white'
              } rounded-lg border-[0.5px] cursor-pointer`}
              key={`question-${question.id}-pagination`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
