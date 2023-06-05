import { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";
import axios from "axios";

const AddMail = () => {
  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsSuccessful(false), 3000);
  }, [isSuccessful]);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault(); //to prevent page refresh on submit
    await axios.post(`/api/${email}`).then(() => {
      setIsSuccessful(true);
    });
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="w-50 md:w-96">
      <Form.Field name="email">
        <div className="flex items-baseline justify-between py-2">
          <Form.Message
            className="text-2xl opacity-[0.8] text-red-600"
            match="valueMissing"
          >
            Please enter your email
          </Form.Message>
          <Form.Message
            className="text-2xl opacity-[0.8] text-red-600"
            match="typeMismatch"
          >
            Please provide a valid email
          </Form.Message>
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
            className="box-border w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-5 text-xl shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white"
            type="email"
            placeholder="your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button
          className="w-full text-xl hover:text-blue-400 py-3"
          type="submit"
        >
          join waitlist
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default AddMail;
