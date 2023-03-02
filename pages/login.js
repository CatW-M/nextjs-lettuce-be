import Link from 'next/link';
import React from 'react';
import RootLayout from './layout';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export default function LoginScreen() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };

  const loginHandler = () => {
    router.push('/product');
  };

  return (
    <div>
      <RootLayout title="Login">
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">Login</h1>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Please enter your email',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: 'Please enter valid email: example@example.com',
                },
              })}
              className="w-full"
              id="email"
              autoFocus
            ></input>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Please enter password',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 chars',
                },
              })}
              className="w-full"
              id="password"
              autoFocus
            ></input>
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-4">
            <button className="primary-button" onClick={loginHandler}>
              Login
            </button>
          </div>
          <div className="mb-4">
            Don&apos;t have an account? &nbsp;
            <Link href="signup">Sign Up Here</Link>
          </div>
        </form>
      </RootLayout>
    </div>
  );
}
