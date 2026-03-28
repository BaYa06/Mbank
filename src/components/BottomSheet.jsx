import { useEffect, useState, useRef } from 'react'
import { X } from 'lucide-react'

const BottomSheet = ({ isOpen, onClose, title, children }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)
	
	// Swipe-to-dismiss state
	const [touchStartY, setTouchStartY] = useState(null)
	const [dragY, setDragY] = useState(0)
	const contentRef = useRef(null)

	const handleTouchStart = (e) => {
		// Only allow dragging if the scrollable content is at the top
		if (contentRef.current && contentRef.current.scrollTop > 0) return
		setTouchStartY(e.touches[0].clientY)
	}

	const handleTouchMove = (e) => {
		if (!touchStartY) return
		const currentY = e.touches[0].clientY
		const diff = currentY - touchStartY
		// Only allow dragging downwards
		if (diff > 0) {
			e.preventDefault() // ← предотвращает скролл фона
			setDragY(diff)
		}
	}

	const handleTouchEnd = () => {
		if (dragY > 150) {
			onClose()
		}
		setTouchStartY(null)
		setDragY(0)
	}

	// Body scroll lock — запрещаем скролл фоновой страницы когда шторка открыта
	useEffect(() => {
		if (isOpen) {
			const scrollY = window.scrollY
			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollY}px`
			document.body.style.width = '100%'
			document.body.style.overflowY = 'scroll'
		} else {
			const scrollY = document.body.style.top
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflowY = ''
			window.scrollTo(0, parseInt(scrollY || '0') * -1)
		}
		return () => {
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflowY = ''
		}
	}, [isOpen])

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true)
			requestAnimationFrame(() => setIsAnimating(true))
		} else {
			setIsAnimating(false)
			const timer = setTimeout(() => setIsVisible(false), 300)
			return () => clearTimeout(timer)
		}
	}, [isOpen])

	if (!isVisible) return null

	return (
		<div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none">
			{/* Backdrop */}
			<div 
				className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 ${
					isAnimating ? 'opacity-100' : 'opacity-0'
				}`}
				onClick={onClose}
			/>
			
			{/* Sheet Content */}
			<div 
				className={`relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl pointer-events-auto flex flex-col max-h-[90vh] ${
					isAnimating && dragY === 0 ? 'translate-y-0 sm:scale-100 transition-transform duration-300 ease-out' 
					: (!isAnimating ? 'translate-y-full sm:translate-y-0 sm:scale-95 transition-transform duration-300 ease-in' : '')
				}`}
				style={{ 
					transform: dragY > 0 ? `translateY(${dragY}px)` : undefined, 
					transition: dragY > 0 ? 'none' : undefined 
				}}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
                {/* Drag Handle (Mobile only) */}
                <div className="w-full flex justify-center pt-3 pb-1 sm:hidden cursor-grab active:cursor-grabbing">
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
                </div>

				<div className="flex items-center justify-between px-5 pt-3 sm:pt-5 pb-3 border-b border-slate-100 shrink-0">
					<h3 className="text-xl font-bold text-slate-900">{title}</h3>
					<button 
						onClick={onClose}
						className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors active:scale-95"
					>
						<X className="w-5 h-5" />
					</button>
				</div>
                
				<div 
					ref={contentRef}
					className="p-5 overflow-y-auto overscroll-contain"
				>
					{children}
				</div>
			</div>
		</div>
	)
}

export default BottomSheet
