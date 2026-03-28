import { Plus, Calendar, Sparkles } from 'lucide-react'

const goals = [
	{
		title: 'Отпуск в Турции',
		current: 42000,
		target: 120000,
		deadline: 'Июль 2026',
		monthly: 13000,
		color: 'bg-[#007E8B]',
	},
	{
		title: 'Подушка безопасности',
		current: 78000,
		target: 150000,
		deadline: 'Декабрь 2026',
		monthly: 8000,
		color: 'bg-[#009C4D]',
	},
	{
		title: 'Новый ноутбук',
		current: 18500,
		target: 80000,
		deadline: 'Сентябрь 2026',
		monthly: 10250,
		color: 'bg-emerald-500',
	},
]

const Goals = () => {
	const totalSaved = goals.reduce((s, g) => s + g.current, 0)
	const totalTarget = goals.reduce((s, g) => s + g.target, 0)

	return (
		<>
			<section className="rounded-2xl p-6 text-white shadow-lg relative overflow-hidden bg-[linear-gradient(135deg,#009C4D_0%,#007E8B_100%)]">
				<div className="flex items-center justify-between mb-2">
					<p className="text-sm opacity-80">Всего накоплено</p>
					<Sparkles className="h-5 w-5 opacity-50" />
				</div>
				<h2 className="text-3xl font-bold">{totalSaved.toLocaleString('ru')} сом</h2>
				<p className="text-sm opacity-70 mt-1">
					из {totalTarget.toLocaleString('ru')} сом по всем целям
				</p>
				<div className="mt-4 h-3 bg-white/20 rounded-full overflow-hidden">
					<div
						className="h-full bg-white rounded-full"
						style={{ width: `${Math.round((totalSaved / totalTarget) * 100)}%` }}
					/>
				</div>
			</section>

			<section>
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-bold">Мои цели</h3>
					<button className="flex items-center gap-1.5 text-sm font-semibold text-[#009e4f]">
						<Plus className="h-4 w-4" /> Новая цель
					</button>
				</div>
				<div className="space-y-4">
					{goals.map((goal) => {
						const percent = Math.round((goal.current / goal.target) * 100)
						return (
							<div
								key={goal.title}
								className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
							>
								<div className="flex items-center justify-between mb-1">
									<p className="text-base font-semibold text-slate-900">{goal.title}</p>
									<span className="text-sm font-bold text-[#009C4D]">{percent}%</span>
								</div>
								<div className="mt-3 h-2.5 rounded-full bg-slate-100 overflow-hidden">
									<div
										className={`h-full rounded-full ${goal.color}`}
										style={{ width: `${percent}%` }}
									/>
								</div>
								<div className="mt-3 flex justify-between text-xs text-slate-500">
									<span>{goal.current.toLocaleString('ru')} сом</span>
									<span>{goal.target.toLocaleString('ru')} сом</span>
								</div>
								<div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100">
									<div className="flex items-center gap-1.5 text-xs text-slate-500">
										<Calendar className="h-3.5 w-3.5" />
										<span>{goal.deadline}</span>
									</div>
									<p className="text-xs text-slate-600">
										Откладывать{' '}
										<span className="font-semibold text-slate-900">
											{goal.monthly.toLocaleString('ru')} сом/мес
										</span>
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</section>

			<section className="rounded-xl border border-dashed border-emerald-300 bg-emerald-50 p-4">
				<p className="text-sm text-emerald-800 font-semibold">Рекомендация</p>
				<p className="text-xs text-emerald-700 mt-1">
					При текущих темпах вы достигнете цели «Подушка безопасности» на 2 месяца раньше срока.
					Продолжайте в том же духе!
				</p>
			</section>
		</>
	)
}

export default Goals
