import FormTextInput from "@/components/forms/FormTextInput";
import Container from "@/components/container";

export default function LoginFormContent() {
  return (
    <Container className="mt-[33px]">
      <p className="flex  items-center mb-[104px] gap-4 text-[12px] leading-[14px] text-foreground">
        <span> Главная </span> | <span>Войти в кабинет</span>
      </p>
      <div className="flex  gap-[92px]">
        <div className="w-full  max-w-[360px]">
          <img src="/logo.svg" className="w-[175px] h-[115px]" alt="image" />
          <p className="text-foreground leading-[17px] text-[15px] mb-[31px]">
            Автоматизация процесса: производство, склад, продажи и контроль
            процессов для роста вашего бизнеса.
          </p>

          <FormTextInput
            name="login"
            placeholder="login"
            // label="userName"
            className="mb-12"
          />
          <button className="py-[12px] px-[25px] cursor-pointer bg-[#282828] text-[15px] leading-[18px] text-white">
            Войти
          </button>
        </div>
        <img src={'/images/login-images.png'}/>
      </div>
    </Container>
  );
}
