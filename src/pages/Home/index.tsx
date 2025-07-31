import React, { useState } from 'react';
import { Button, Checkbox, Input } from '../../components';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [isAdult, setIsAdult] = useState(false);
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');

  const validateName = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      setNameError('Please enter your name.');
      return false;
    }

    const parts = trimmed.split(' ').filter(part => part.length >= 2);

    if (parts.length < 2) {
      setNameError('Please enter your full name (first and last).');
      return false;
    }

    setNameError('');
    return true;
  };

  const validateAge = (checked: boolean) => {
    if (!checked) {
      setAgeError('You must be at least 18 years old to proceed.');
      return false;
    } else {
      setAgeError('');
      return true;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handleAgeChange = (checked: boolean) => {
    setIsAdult(checked);
    validateAge(checked);
  };

  const isNameValid = name.trim().split(' ').filter(part => part.length >= 2).length >= 2;
  const isFormValid = isNameValid && isAdult;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validateName(name);
    const isAgeValid = validateAge(isAdult);

    if (isNameValid && isAgeValid) {
      navigate('/places');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-300/80 flex flex-col justify-center items-center p-4 relative">
      <main role="main" className="w-full max-w-md p-8" aria-labelledby="form-title">
        <h1 id="form-title" className="sr-only">User Registration</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} aria-describedby="form-description">
          <div id="form-description" className="sr-only">
            Enter your full name and confirm that you are over 18 years old to continue.
          </div>
          <p className="text-gray-950">Please, enter your full name below</p>
          <p className="text-gray-950">Only alphabetical characters are allowed.</p>
          <Input
            id="name"
            name="name"
            placeholder="Your full name"
            value={name}
            onChange={handleNameChange}
            error={nameError}
            aria-invalid={!!nameError}
            aria-describedby={nameError ? 'name-error' : undefined}
            autoComplete="name"
          />

          <div className="w-full flex flex-col items-start mt-2">
            <Checkbox
              id="age"
              label="I confirm that I am at least 18 years old"
              checked={isAdult}
              onChange={handleAgeChange}
              error={ageError}
              aria-invalid={!!ageError}
              aria-describedby={ageError ? 'age-error' : undefined}
            />
          </div>

          <div className="w-full flex flex-col items-center mt-4">
            <Button
              type="submit"
              disabled={!isFormValid}
              aria-disabled={!isFormValid}
              aria-label="Submit form"
            >
              Enter
            </Button>
          </div>
        </form>
      </main>

      <img
        src="/logo.png"
        alt="Company logo"
        className="absolute bottom-0 left-0 w-32 sm:w-40 md:w-52 lg:w-60 xl:w-72 max-w-full h-auto object-contain p-2"
      />
    </div>
  );
};

export default Home;
