import LogoIcon from "../icon/LogoIcon";
import TaskCreator from "../tasks/TaskCreator";

export default function Header() {
  return (
    <>
      <header
        role="banner"
        className="fixed inset-x-0 top-0 h-16 bg-white/95 backdrop-blur border-b border-slate-200 z-40"
      >
        <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoIcon />
            <div>
              <h1 className="text-lg text-black mb-1 font-semibold leading-5">
                تابلو مدیریت وظایف
              </h1>
              <p className="text-sm text-slate-500 leading-4">
                نمای کلی پروژه‌ها و وضعیت وظایف
              </p>
            </div>
          </div>
          <TaskCreator />
        </div>
      </header>
    </>
  );
}
