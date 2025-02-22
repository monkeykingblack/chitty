import { useFormStatus } from 'react-dom';
import { Form } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <Form method="POST">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box flex flex-col gap-4 border p-4">
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          id="username"
          name="username"
          placeholder="Your name"
          className="input validator w-full"
          required
          minLength={4}
          autoFocus={true}
          autoComplete="off"
        />
        <p className="fieldset-label">Username will display to other people</p>

        <Submit />
      </fieldset>
    </Form>
  );
};

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-neutral w-full" type="submit" disabled={pending}>
      {pending && <span className="loading loading-spinner loading-sm" />} Login
    </button>
  );
};
