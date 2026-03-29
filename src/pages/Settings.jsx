import { useState } from 'react'
import { Users, LayoutDashboard, Accessibility, ShieldCheck, UserCheck, Search } from 'lucide-react'
import BottomSheet from '../components/BottomSheet'

export default function Settings() {
  const [approval, setApproval] = useState(true)
  const [seniorMode, setSeniorMode] = useState(false)
  const [isSeniorSheetOpen, setIsSeniorSheetOpen] = useState(false)
  const [limit, setLimit] = useState(500)

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Family Controls Section */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Семейный контроль</h2>
        <div className="w-full">
          {/* Card: Timur */}
          <div className="bg-blue-50/50 rounded-3xl border border-blue-100 p-5 flex flex-col gap-5">
            {/* Header info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-full bg-white border border-blue-100 flex items-center justify-center shadow-sm shrink-0">
                <span className="text-2xl">👦</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-bold text-slate-900 text-lg truncate">Счет: Тимур</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wide">Связан и активен</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-blue-100/50 w-full" />

            {/* Daily Limit Control */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-800 font-bold text-sm">Дневной лимит трат</span>
                <span className="text-blue-700 font-black text-base">{limit} сом</span>
              </div>
              <div className="flex gap-2">
                {[500, 1000, 2000].map(val => (
                  <button
                    key={val}
                    onClick={() => setLimit(val)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                      limit === val
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'bg-white border border-blue-200 text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    {val} ⊆
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Ребенок не сможет потратить больше {limit} сом в день. При попытке превысить лимит вам придет PUSH-уведомление.
              </p>
            </div>

            <div className="h-px bg-blue-100/50 w-full" />

            {/* Transaction Approval */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col flex-1 min-w-0 pr-2">
                <span className="font-bold text-slate-900 truncate">Игровые покупки</span>
                <span className="text-[11px] text-slate-500 leading-tight mt-1 font-medium">Спрашивать разрешение на Steam, PS Store</span>
              </div>
              <button
                onClick={() => setApproval(!approval)}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out flex-shrink-0 ${approval ? 'bg-blue-600' : 'bg-blue-200'}`}
              >
                <div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${approval ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Специальные возможности</h2>
        <div className="bg-purple-50/50 rounded-2xl border border-purple-100 p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                <Accessibility className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-bold text-slate-900 text-lg truncate">Режим для пожилых</span>
                <span className="text-sm text-slate-500 leading-tight mt-0.5 block">Упрощенный контрастный интерфейс</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!seniorMode) {
                  setIsSeniorSheetOpen(true)
                } else {
                  setSeniorMode(false)
                  document.documentElement.classList.remove('senior-mode-active')
                }
              }}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out flex-shrink-0 ${seniorMode ? 'bg-purple-600' : 'bg-slate-200'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${seniorMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </section>
      {/* Senior Mode Bottom Sheet */}
      <BottomSheet
        isOpen={isSeniorSheetOpen}
        onClose={() => setIsSeniorSheetOpen(false)}
        title="Режим заботы (ИИ)"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-slate-600 font-medium px-1">
            Ключевые функции, которые сделают банковское приложение безопаснее и проще.
          </p>

          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900">Анти-Фрод Защита (ИИ)</p>
              <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">Подозрительные крупные переводы на незнакомые номера будут временно заморожены до проверки.</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900">Доверительное управление</p>
              <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">Если ИИ заметит странную операцию, мы отправим запрос на подтверждение вашим родственникам.</p>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900">Упрощенный интерфейс</p>
              <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">Увеличенный шрифт, контрастные цвета и только самые важные функции на главном экране.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => {
                setSeniorMode(true);
                setIsSeniorSheetOpen(false);
                document.documentElement.classList.add('senior-mode-active')
              }}
              className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold text-base hover:bg-purple-700 transition-colors active:scale-95 shadow-md shadow-purple-600/20"
            >
              Включить режим
            </button>
            <button
              onClick={() => setIsSeniorSheetOpen(false)}
              className="w-full py-4 rounded-xl bg-slate-100 text-slate-700 font-semibold text-base hover:bg-slate-200 transition-colors active:scale-95"
            >
              Отмена
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
