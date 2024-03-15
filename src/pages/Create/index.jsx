import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useFormik } from 'formik';
import * as yup from 'yup';
import Choices from '../../components/Choices';
import Select from '../../components/Select';

const OPTION_TYPES = ['text', 'textarea', 'choices'];

const quizScheme = yup.object().shape({
  title: yup.string().required('Quiz title is required'),
  questions: yup.array().of(
    yup.object().shape({
      question: yup.string().required('Question is required'),
      type: yup.string().oneOf(OPTION_TYPES).required('Question is required'),
      required: yup.bool(),
      options: yup.array().of(
        yup.object().shape({
          label: yup.string().required('Option label is required'),
          value: yup.string().required('Option value is required'),
          correct: yup.string(),
        })
      ),
    })
  ),
});

const OPTION_TEMPLATE = {
  label: '',
  value: '',
  correct: false,
};

const QUESTION_TYPES = [
  {
    label: 'Text',
    value: 'text',
  },
  {
    label: 'Textarea',
    value: 'textarea',
  },
  {
    label: 'Choices',
    value: 'choices',
  },
];

const QUESTION_TEMPLATE = {
  question: '',
  type: 'choices',
  required: true,
  options: [OPTION_TEMPLATE],
};

const Create = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      questions: [QUESTION_TEMPLATE],
    },
    validationSchema: quizScheme,
    onSubmit: (data) => (window.aa = data),
  });

  const questionAddHandler = () => {
    formik.setFieldValue('questions', [
      ...formik.values.questions,
      QUESTION_TEMPLATE,
    ]);
  };

  const questionOptionAddHandler = (index) => {
    formik.setFieldValue(`questions.${index}.options`, [
      ...formik.values.questions[index].options,
      OPTION_TEMPLATE,
    ]);
  };

  const questionChangeHandler = (value, key, index) =>
    formik.setFieldValue(`questions.${index}.${key}`, value);

  const optionChangeHandler = (value, key, questionIndex, optionIndex) =>
    formik.setFieldValue(
      `questions.${questionIndex}.options.${optionIndex}.${key}`,
      value
    );

  return (
    <div className='flex justify-center'>
      <div className=' lg:w-1/2 w-full mx-2 my-10'>
        <div className='bg-white rounded-lg shadow-lg p-5 mx-2'>
          <h2>Create a new quiz</h2>
          <hr className='my-4' />
          <form onSubmit={formik.handleSubmit}>
            <Input
              value={formik.values['title']}
              placeHolder={'Enter quiz title'}
              label={'Quiz title'}
              hint={'Enter quiz title'}
              classes={'w-full'}
              autoFocus
              name='title'
              onChange={formik.handleChange}
              error={formik.touched['title'] && formik.errors['title']}
            />
            <hr className='my-4' />
            <div className='flex justify-between items-center'>
              <h6 className='text-sm'>Add questions to quiz</h6>
              <Button
                type='button'
                label={'+'}
                classes={'py-2'}
                onClick={questionAddHandler}
              />
            </div>
            <hr className='my-4' />
            {formik.values['questions'].map((question, questionIndex) => (
              <div
                key={`question-${questionIndex}`}
                className='mb-2'
              >
                <Input
                  value={question.question}
                  placeHolder={`Question ${questionIndex + 1}`}
                  label={`Question ${questionIndex + 1}`}
                  hint={'Enter quiz title'}
                  classes={'w-full'}
                  onChange={(e) =>
                    questionChangeHandler(
                      e.target.value,
                      'question',
                      questionIndex
                    )
                  }
                />
                <Select
                  label={'Question type'}
                  options={QUESTION_TYPES}
                  changeHandler={(value) =>
                    questionChangeHandler(value, 'type', questionIndex)
                  }
                  value={question.type}
                />
                {question.type === 'choices' && (
                  <Choices
                    questionIndex={questionIndex}
                    options={question.options}
                    addNewHandler={() =>
                      questionOptionAddHandler(questionIndex)
                    }
                    optionChangeHandler={optionChangeHandler}
                  />
                )}
                <hr className='my-4' />
              </div>
            ))}
            <div className='flex justify-end'>
              <Button
                type='submit'
                label={'Create'}
                classes={'py-3'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
