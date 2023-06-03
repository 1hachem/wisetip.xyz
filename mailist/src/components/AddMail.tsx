import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { api } from "@/utils/api";

const AddMail = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await api.post(`/${email}`);
    window.alert("Email added successfully!");
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="w-50 md:w-96">
      <Form.Field name="email">
        <div className="flex items-baseline justify-between">
          <Form.Message
            className="text-[13px] opacity-[0.8]"
            match="valueMissing"
          >
            Please enter your email
          </Form.Message>
          <Form.Message
            className="text-[13px] opacity-[0.8]"
            match="typeMismatch"
          >
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white"
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
          className="box-border w-full inline-flex items-center justify-center text-xl hover:text-blue-400 py-3"
          type="submit"
        >
          join waitlist
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default AddMail;
