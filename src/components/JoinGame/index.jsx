import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';

import { useNavigate } from 'react-router-dom';

const JoinGame = () => {
  const [gameId, setGameId] = useState('');

  const navigate = useNavigate();

  const onSubmit = () => {
    if (gameId) {
      navigate(`/quiz/${gameId}`);
    }
  };

  return (
    <>
      <form
        className='flex flex-row items-start'
        onSubmit={onSubmit}
      >
        <Input
          value={gameId}
          placeHolder={'Enter unique quiz-id to join'}
          classes={'mb-6 rounded-tr-none rounded-br-none'}
          autoFocus={true}
          onChange={(e) => setGameId(e.target.value)}
        />
        <Button
          type='submit'
          label={'Join'}
          classes={'rounded-tl-none rounded-bl-none'}
          onClick={onSubmit}
        />
      </form>
    </>
  );
};

export default JoinGame;
