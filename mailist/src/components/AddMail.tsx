import * as Form from "@radix-ui/react-form";

const AddMail = () => (
  <Form.Root className="w-96">
    <Form.Field className="grid mb-[10px]" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-xl leading-[35px]">
          Email
        </Form.Label>
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
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
          type="email"
          required
        />
      </Form.Control>
    </Form.Field>

    <Form.Submit asChild>
      <button className="box-border w-full inline-flex items-center justify-center rounded-xl font-xl focus:outline-none">
        join waitlist
      </button>
    </Form.Submit>
  </Form.Root>
);

export default AddMail;
