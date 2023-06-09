import { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";
import axios from "axios";

const AddMail = () => {
  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsSuccessful(false), 3000);
  }, [isSuccessful]);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    //to prevent page refresh on submit
    await axios
      .post(`/api/${email}`)
      .then(() => {
        setIsSuccessful(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="w-50 md:w-96 mt-4 flex flex-col gap-2">
      <Form.Field name="email">
      <div className='flex items-baseline justify-between'>
        <Form.Label className="font-semibold">Email</Form.Label>
          <Form.Message
            className="text-sm opacity-[0.8] text-red-500"
            match="valueMissing"
          >
            Please enter your email
          </Form.Message>
          <Form.Message
            className="text-sm opacity-[0.8] text-red-500"
            match="typeMismatch"
          >
            Please provide a valid email
          </Form.Message>
      </div>
        <div className="flex items-baseline justify-between py-2">
          {isSuccessful && (
            <Form.Message
              className="text-2xl opacity-[0.8] text-green-500"
              match="valid"
            >
              you joined the wait list ! 🎉
            </Form.Message>
          )}
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full inline-flex appearance-none items-center justify-center rounded-[4px] px-2 py-1 text-xl shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white"
            type="email"
            placeholder="john@doe.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button
          className={`w-full text-xl hover:text-blue-400 rounded-md border py-2 disabled:text-gray-500 shadow-sm ${
            isLoading ? "cursor-wait" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          Join waitlist!
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default AddMail;
