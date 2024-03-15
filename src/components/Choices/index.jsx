import React from 'react';
import Input from '../Input';
import Button from '../Button';

const Choices = ({
  questionIndex = null,
  options = [],
  addNewHandler = () => null,
  optionChangeHandler = (value, key, questionIndex, optionIndex) => null,
}) => {
  return (
    <>
      <div className='flex justify-between items-center mt-4'>
        <h6 className='text-sm'>
          Add options to question (Select the correct option)
        </h6>
        <Button
          type='button'
          label={'+'}
          classes={'py-2'}
          onClick={addNewHandler}
        />
      </div>
      <hr className='my-4' />
      {options.map((option, optionIndex) => (
        <div
          className='my-4 flex justify-start items-center gap-2 cursor-pointer'
          key={`question-${questionIndex}-option-${optionIndex}`}
        >
          <input
            type='radio'
            name={`question-${questionIndex}-correct`}
            value={option.correct}
            onChange={(e) =>
              optionChangeHandler(
                e.target.checked,
                'correct',
                questionIndex,
                optionIndex
              )
            }
          />
          <Input
            value={option.label}
            placeHolder={`Option label ${optionIndex + 1}`}
            label={`Option label ${optionIndex + 1}`}
            hint={'Enter option label'}
            classes={'w-full'}
            onChange={(e) =>
              optionChangeHandler(
                e.target.value,
                'label',
                questionIndex,
                optionIndex
              )
            }
          />
          <Input
            value={option.value}
            placeHolder={`Option value ${optionIndex + 1}`}
            label={`Option value ${optionIndex + 1}`}
            hint={'Enter option value'}
            classes={'w-full'}
            onChange={(e) =>
              optionChangeHandler(
                e.target.value,
                'value',
                questionIndex,
                optionIndex
              )
            }
          />
        </div>
      ))}
    </>
  );
};

export default Choices;
