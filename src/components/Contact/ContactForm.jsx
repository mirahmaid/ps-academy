import { useState } from "react";

function getStatus(field) {
  if (field.value.trim().length > 0) return "filled";
  if (field.touched) return "error";
  return "idle";
}

function StepDot({ status, isLast, isFirst, alignTop }) {
  const finalStatus = isFirst && status === "idle" ? "filled" : status;

  let dotColor = "bg-gray-300";
  let ringColor = "bg-gray-200/50 scale-75";

  if (finalStatus === "filled") {
    dotColor = "bg-[#002C5A]";
    ringColor = "bg-[#002C5A]/20 scale-100";
  } else if (finalStatus === "error") {
    dotColor = "bg-red-500";
    ringColor = "bg-red-500/20 scale-100";
  }

  return (
    <div className={`relative flex h-full w-full justify-center ${alignTop ? "items-start pt-3" : "items-center"}`}>
      {!isLast && (
        <span
          className="absolute top-1/2 w-0.5 bg-gray-200"
          style={{ height: "calc(100% + 1rem)" }}
        />
      )}
      <span className="relative flex items-center justify-center">
        <span className={`absolute h-6 w-6 rounded-full transition-all duration-500 ${ringColor}`} />
        <span className={`relative h-3 w-3 rounded-full transition-all duration-300 ${dotColor}`} />
      </span>
    </div>
  );
}

const emptyField = { value: "", touched: false };
const initialFields = {
  fullName: emptyField,
  email: emptyField,
  phone: emptyField,
  message: emptyField,
};

function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: { ...fields[name], value },
    });
  }

  function handleBlur(name) {
    setFields({
      ...fields,
      [name]: { ...fields[name], touched: true },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    console.log("البيانات المدخلة:", {
      fullName: fields.fullName.value,
      email: fields.email.value,
      phone: fields.phone.value,
      message: fields.message.value,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSending(false);
    setFields(initialFields);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 flex flex-col gap-4">
      <div className="grid grid-cols-[24px_1fr] items-stretch gap-x-4 gap-y-4">
        <StepDot status={getStatus(fields.fullName)} isFirst />
        <input
          type="text"
          name="fullName"
          placeholder="إسمك كامل"
          value={fields.fullName.value}
          onChange={handleChange}
          onBlur={() => handleBlur("fullName")}
          required
          className="contact-field border border-gray-300 rounded-full px-5 py-3 text-sm text-right outline-none focus:border-[#002C5A] transition-colors duration-300"
        />

        <StepDot status={getStatus(fields.email)} />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={fields.email.value}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          required
          className="contact-field border border-gray-300 rounded-full px-5 py-3 text-sm text-right outline-none focus:border-[#002C5A] transition-colors duration-300"
        />

        <StepDot status={getStatus(fields.phone)} />
        <input
          type="tel"
          name="phone"
          placeholder="رقم الهاتف"
          value={fields.phone.value}
          onChange={handleChange}
          onBlur={() => handleBlur("phone")}
          required
          className="contact-field border border-gray-300 rounded-full px-5 py-3 text-sm text-right outline-none focus:border-[#002C5A] transition-colors duration-300"
        />

        <StepDot status={getStatus(fields.message)} isLast alignTop />
        <textarea
          name="message"
          placeholder="الرسالة"
          rows="4"
          value={fields.message.value}
          onChange={handleChange}
          onBlur={() => handleBlur("message")}
          required
          className="contact-field border border-gray-300 rounded-xl px-5 py-3 text-sm text-right resize-none outline-none focus:border-[#002C5A] transition-colors duration-300"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="contact-field bg-[#002C5A] text-white rounded-full px-6 py-3 font-bold mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {sending ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            جاري الإرسال...
          </>
        ) : (
          "تواصل معنا"
        )}
      </button>
    </form>
  );
}

export default ContactForm;