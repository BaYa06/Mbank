import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Nfc, Sparkles, ShoppingCart, Coffee, Wallet, MonitorPlay, Car, ArrowRight, X, Check, Gamepad2, FileText, Zap, Building2, Gift, UserCircle } from 'lucide-react'
import BottomSheet from '../components/BottomSheet'

const Dashboard = () => {
	const navigate = useNavigate()
	const [showNotification, setShowNotification] = useState(false)
	const [isBillsSheetOpen, setIsBillsSheetOpen] = useState(false)
	const [isIncomeSheetOpen, setIsIncomeSheetOpen] = useState(false)
	const [isBudgetSheetOpen, setIsBudgetSheetOpen] = useState(false)

	useEffect(() => {
		// const timer = setTimeout(() => {
		// 	setShowNotification(true)
		// }, 1500)
		// return () => clearTimeout(timer)
	}, [])

	return (
		<>
			{/* Simulated Family Control Notification */}
			<div className={`fixed top-4 left-4 right-4 z-[99] transition-all duration-500 transform ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
				<div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl border border-slate-200 flex flex-col gap-3 relative overflow-hidden">
					<div className="absolute top-0 left-0 w-1.5 h-full bg-[#009C4D]" />
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
								<span className="text-xl">👦</span>
							</div>
							<div>
								<p className="text-[13px] font-bold text-slate-900 leading-tight">Сын (Семейный контроль)</p>
								<p className="text-[11px] font-medium text-slate-500 mt-0.5">Запрашивает перевод</p>
							</div>
						</div>
						<button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 active:scale-95 transition-colors absolute top-4 right-4 bg-slate-50 rounded-full p-1">
							<X className="w-4 h-4" />
						</button>
					</div>

					<div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200">
							<Gamepad2 className="w-5 h-5" />
						</div>
						<div className="flex-1">
							<p className="text-xs font-bold text-slate-900">Покупка игры в Steam</p>
							<p className="text-[15px] font-black text-indigo-600 leading-none mt-1">850 сом</p>
						</div>
					</div>

					<div className="flex gap-2 mt-1">
						<button 
							onClick={() => setShowNotification(false)}
							className="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold text-[13px] hover:bg-slate-200 active:scale-95 transition-all"
						>
							Отказать
						</button>
						<button 
							onClick={() => setShowNotification(false)}
							className="flex-1 py-3 rounded-2xl bg-[#009C4D] text-white font-bold text-[13px] flex items-center justify-center gap-1.5 hover:bg-emerald-600 active:scale-95 transition-all shadow-md shadow-[#009C4D]/20"
						>
							<Check className="w-4 h-4" />
							Одобрить
						</button>
					</div>
				</div>
			</div>

			{/* Balance Card */}
			<section className="balance-gradient rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
				<div className="flex justify-between items-start mb-8">
					<span className="font-bold text-lg opacity-90 tracking-wider"><span className="text-[#FFF100]">M</span>BANK</span>
					<Nfc className="w-6 h-6 opacity-60" />
				</div>
				<div className="space-y-1">
					<p className="text-sm font-medium opacity-80">Общий баланс</p>
					<h2 className="text-[40px] font-bold leading-none tracking-tight">124 580 сом</h2>
				</div>
				<div className="mt-8 space-y-2">
					<p className="text-sm font-semibold bg-white/20 px-3 py-1.5 rounded-full inline-block backdrop-blur-md">
						Свободно сегодня: 3 200 сом
					</p>
					<p className="text-[10px] font-medium opacity-70 italic ml-1 mb-1">Обновлено: только что</p>
				</div>
				{/* Decorative circles */}
				<div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
				<div className="absolute -left-6 top-10 w-24 h-24 bg-black/5 rounded-full blur-xl" />
			</section>

			{/* Budget Health Card */}
			<section 
				onClick={() => setIsBudgetSheetOpen(true)}
				className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm cursor-pointer active:scale-95 transition-transform"
			>
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-bold text-slate-900">Бюджет месяца</h3>
					<button className="text-xs font-semibold text-[#009C4D] bg-[#009C4D]/10 px-2.5 py-1 rounded-full">
						Изменить
					</button>
				</div>
				<div className="space-y-3">
					<div className="flex justify-between text-sm">
						<span className="text-slate-500 font-medium">
							Потрачено: <span className="text-slate-900 font-bold">61 400 сом</span>
						</span>
						<span className="text-[#009C4D] font-bold">65%</span>
					</div>
					<div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
						<div className="h-full bg-[#009C4D] rounded-full transition-all duration-1000 ease-out" style={{ width: '65%' }} />
					</div>
					<div className="flex justify-between items-center pt-1">
						<p className="text-sm text-[#009C4D] font-semibold">Осталось: 33 100 сом</p>
						<p className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">15 дней</p>
					</div>
				</div>
			</section>

			{/* Mandatory Expenses Summary */}
			<section className="flex gap-3">
				<div 
					onClick={() => setIsBillsSheetOpen(true)}
					className="flex-1 bg-red-50 rounded-3xl p-4 border border-red-100 relative overflow-hidden cursor-pointer active:scale-95 transition-transform"
				>
					<p className="text-xs font-semibold text-red-500 mb-1">Обязательные счета</p>
					<p className="text-xl font-bold text-red-900 leading-tight">5 390 сом</p>
					<button className="mt-2 text-xs font-bold text-white bg-red-500 py-1.5 px-3 rounded-full hover:bg-red-600 transition-colors">Смотреть</button>
					<div className="absolute -right-2 -top-2 w-16 h-16 bg-red-500/10 rounded-full blur-lg pointer-events-none" />
				</div>
				<div 
					onClick={() => setIsIncomeSheetOpen(true)}
					className="flex-1 bg-emerald-50 rounded-3xl p-4 border border-emerald-100 relative overflow-hidden cursor-pointer active:scale-95 transition-transform"
				>
					<p className="text-xs font-semibold text-emerald-600 mb-1">Поступления (Скор)</p>
					<p className="text-xl font-bold text-emerald-900 leading-tight">60 000 сом</p>
					<p className="mt-3 text-[11px] font-bold text-emerald-700 bg-emerald-500/10 inline-block px-2 py-0.5 rounded-md">До ЗП ~ 5 дней</p>
					<div className="absolute -right-2 -top-2 w-16 h-16 bg-emerald-500/10 rounded-full blur-lg pointer-events-none" />
				</div>
			</section>

			{/* AI Advisor Card Container */}
			<section 
				onClick={() => navigate('/ai-assistant')}
				className="rounded-3xl p-5 shadow-md bg-[linear-gradient(135deg,#FFF100_0%,#FABF00_100%)] relative overflow-hidden cursor-pointer active:scale-95 transition-transform"
			>
				<div className="relative z-10 flex gap-4">
					<div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center shrink-0 shadow-sm backdrop-blur-md">
						<Sparkles className="w-6 h-6 text-[#A37B00] fill-[#A37B00]" />
					</div>
					<div>
						<h3 className="font-bold text-slate-900 mb-1">ИИ-советник</h3>
						<p className="text-sm text-slate-800 font-medium leading-snug">
							Вы тратите на кофе <span className="font-bold">4 800 сом</span>. Варите дома и сэкономите <span className="font-bold text-slate-900 bg-white/30 px-1 rounded">3 500 сом</span> ежемесячно.
						</p>
						<div className="mt-2 text-xs font-bold text-yellow-900 flex items-center gap-1 opacity-70">
							Узнать больше <ArrowRight className="w-3 h-3" />
						</div>
					</div>
				</div>
				<div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none" />
			</section>

			{/* Recent Transactions */}
			<section className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-bold text-slate-900">Последние операции</h3>
					<button 
						onClick={() => navigate('/transactions')}
						className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
					>
						<ArrowRight className="w-4 h-4" />
					</button>
				</div>
				<div className="space-y-4">
					{[
						{ title: 'Фрунзе Маркет', time: 'Сегодня, 14:20', amount: '-1 240 сом', icon: ShoppingCart, positive: false },
						{ title: 'Кофейня Арт', time: 'Сегодня, 09:15', amount: '-380 сом', icon: Coffee, positive: false },
						{ title: 'Зарплата', time: 'Вчера, 18:00', amount: '+85 000 сом', icon: Wallet, positive: true },
						{ title: 'Netflix', time: '15 марта', amount: '-890 сом', icon: MonitorPlay, positive: false },
						{ title: 'Яндекс Go', time: '14 марта', amount: '-450 сом', icon: Car, positive: false },
					].map((tx) => (
						<div key={tx.title} className="flex items-center gap-3 group">
							<div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${tx.positive ? 'bg-[#009C4D]/10 text-[#009C4D]' : 'bg-slate-50 text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-700'}`}>
								<tx.icon className="w-5 h-5" />
							</div>
							<div className="flex-1">
								<p className="text-sm font-bold text-slate-900">{tx.title}</p>
								<p className="text-xs font-medium text-slate-400">{tx.time}</p>
							</div>
							<p className={`font-bold text-[15px] ${tx.positive ? 'text-[#009C4D]' : 'text-slate-900'}`}>
								{tx.amount}
							</p>
						</div>
					))}
				</div>
				<button 
					onClick={() => navigate('/transactions')}
					className="w-full mt-4 py-3.5 rounded-xl bg-slate-50 text-sm font-bold text-[#009C4D] hover:bg-slate-100 active:scale-95 transition-colors border border-dashed border-slate-200"
				>
					Смотреть всю историю транзакций
				</button>
			</section>

			{/* Mandatory Bills Sheet */}
			<BottomSheet
				isOpen={isBillsSheetOpen}
				onClose={() => setIsBillsSheetOpen(false)}
				title="К оплате до конца месяца"
			>
				<div className="flex flex-col gap-4">
					<div className="bg-red-50 rounded-2xl p-4 border border-red-100 flex items-center justify-between">
						<div>
							<p className="text-sm font-semibold text-red-900">Итого к оплате</p>
							<p className="text-xs font-medium text-red-700/70">Из них 1 просрочен</p>
						</div>
						<span className="text-xl font-black text-red-600">5 390 сом</span>
					</div>

					<div className="divide-y divide-slate-100">
						{[
							{ title: 'Штраф ПДД', due: 'Просрочено на 2 дня', amount: '1 500 сом', urgent: true, icon: Car },
							{ title: 'Кредит (MBANK)', due: 'Завтра', amount: '2 400 сом', urgent: true, icon: Wallet },
							{ title: 'Подписка Netflix', due: 'Через 4 дня', amount: '890 сом', urgent: false, icon: MonitorPlay },
							{ title: 'Коммунальные (Свет)', due: 'Через 7 дней', amount: '600 сом', urgent: false, icon: Zap },
						].map((item) => (
							<div key={item.title} className="flex items-center gap-3 py-3">
								<div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.urgent ? 'bg-red-100 text-red-500' : 'bg-slate-100 text-slate-500'}`}>
									<item.icon className="w-5 h-5" />
								</div>
								<div className="flex-1">
									<p className={`text-sm font-bold ${item.urgent ? 'text-red-600' : 'text-slate-900'}`}>
										{item.title}
									</p>
									<p className={`text-xs font-medium ${item.urgent ? 'text-red-400' : 'text-slate-400'}`}>
										{item.due}
									</p>
								</div>
								<div className="text-right">
									<span className="text-[15px] font-bold text-slate-900 block leading-tight">{item.amount}</span>
									<button className="text-[11px] font-bold text-[#009C4D] bg-[#009C4D]/10 px-2 py-0.5 rounded mt-1 hover:bg-[#009C4D]/20 transition-colors">
										Оплатить
									</button>
								</div>
							</div>
						))}
					</div>

					<button 
						onClick={() => setIsBillsSheetOpen(false)}
						className="w-full mt-2 py-4 rounded-xl bg-red-500 text-white font-bold text-base hover:bg-red-600 transition-colors active:scale-95 shadow-md shadow-red-500/20"
					>
						Оплатить все сразу
					</button>
				</div>
			</BottomSheet>

			{/* Expected Income Sheet */}
			<BottomSheet
				isOpen={isIncomeSheetOpen}
				onClose={() => setIsIncomeSheetOpen(false)}
				title="Прогноз поступлений"
			>
				<div className="flex flex-col gap-4">
					<div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between">
						<div>
							<p className="text-sm font-semibold text-emerald-900">Ожидается до конца апреля</p>
							<p className="text-xs font-medium text-emerald-700/70">На основе ИИ-анализа</p>
						</div>
						<span className="text-xl font-black text-emerald-600">63 500 сом</span>
					</div>

					<div className="divide-y divide-slate-100">
						{[
							{ title: 'Зарплата (ООО Ромашка)', date: 'Ожидается ~ 5 апреля', amount: '60 000 сом', icon: Building2 },
							{ title: 'Долг от Азамата', date: 'Обычно переводит по пятницам', amount: '2 000 сом', icon: UserCircle },
							{ title: 'Кэшбэк MBANK', date: 'Ожидается 1 апреля', amount: '1 500 сом', icon: Gift },
						].map((item) => (
							<div key={item.title} className="flex items-center gap-3 py-3">
								<div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 text-emerald-600">
									<item.icon className="w-5 h-5" />
								</div>
								<div className="flex-1">
									<p className="text-sm font-bold text-slate-900">
										{item.title}
									</p>
									<p className="text-xs font-medium text-slate-500">
										{item.date}
									</p>
								</div>
								<div className="text-right">
									<span className="text-[15px] font-bold text-emerald-600 block leading-tight">+{item.amount}</span>
								</div>
							</div>
						))}
					</div>

					<div className="mt-2 bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-start gap-3">
						<Sparkles className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
						<p className="text-xs text-slate-600 font-medium leading-relaxed">
							Прогноз строится на основе ваших регулярных поступлений за последние 3 месяца. Возможны погрешности, если дата выпадает на выходные.
						</p>
					</div>

					<button 
						onClick={() => setIsIncomeSheetOpen(false)}
						className="w-full mt-2 py-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-base hover:bg-slate-200 transition-colors active:scale-95"
					>
						Понятно
					</button>
				</div>
			</BottomSheet>

			{/* Set Monthly Budget Sheet */}
			<BottomSheet
				isOpen={isBudgetSheetOpen}
				onClose={() => setIsBudgetSheetOpen(false)}
				title="Общий бюджет на месяц"
			>
				<div className="flex flex-col gap-5">
					<p className="text-sm text-slate-600 font-medium px-1">
						Установите сумму, которую вы планируете потратить в этом месяце. ИИ будет помогать вам не выходить за эти рамки.
					</p>

					<div className="flex flex-col gap-1.5 relative">
						<label className="text-sm font-semibold text-slate-500 ml-1">Лимит (сом/мес)</label>
						<input 
							type="number" 
							defaultValue="94500"
							className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-900 font-black outline-none focus:ring-2 ring-[#009C4D] transition-all text-xl" 
						/>
						<span className="absolute right-4 top-[42px] text-slate-400 font-bold">сом</span>
					</div>

					<div className="mt-1 bg-emerald-50 rounded-2xl p-4 flex items-start gap-3 border border-emerald-100">
						<Sparkles className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
						<div className="flex flex-col">
							<span className="text-sm font-bold text-emerald-900">Рекомендация ИИ</span>
							<span className="text-xs text-emerald-800 font-medium leading-relaxed mt-1">
								Оптимальный бюджет для вас: <b>90 000 сом</b>. Если снизить текущий лимит на 4 500 сом, вы сможете быстрее накопить на вашу цель в Кошельке!
							</span>
						</div>
					</div>

					<button 
						onClick={() => setIsBudgetSheetOpen(false)}
						className="w-full py-4 rounded-xl bg-[#009C4D] text-white font-bold text-base hover:bg-emerald-600 transition-colors active:scale-95 shadow-lg shadow-[#009C4D]/20 mt-2"
					>
						Сохранить бюджет
					</button>
				</div>
			</BottomSheet>
		</>
	)
}

export default Dashboard
