import { useNavigate } from 'react-router-dom';
import Button from './components/Button';
import JoinGame from './components/JoinGame';

export default function App() {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/quiz/create`);
  };

  return (
    <section className='container mx-auto h-screen flex flex-col justify-center items-center'>
      <h1 className='text-5xl text-primary font-bold mb-9'>Quiz Application</h1>
      <JoinGame />
      <div className='mb-5'>
        <p>Or</p>
      </div>
      <Button
        onClick={onSubmit}
        label={'Create a quiz'}
      />
    </section>
  );
}
