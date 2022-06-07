import {DomListener} from "@/core/DomListener";

export class ExcelComponent extends DomListener {

    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.store = options.store
        this.unsubscribers = []
        this.storeSub = null
        this.prepare()
    }

    // Настраиваем наш компонент до инит
    prepare() {}

    // return template component
    toHTML() {
        return '';
    }

    // Уведомляем слушателей про event события
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // подписываемся на события event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    $subscribe(fn) {
        const storeSub = this.store.subscribe(fn)
    }

    // инициализируем компонент
    // добавляем дом слушателей
    init() {
        this.initDomListeners()
    }

    // удаляем компонент
    // чистим слушателей
    destroy() {
        this.removeDomListeners()
        this.unsubscribers.forEach(unsubs => unsubs())
        this.storeSub.unsubscribe()
    }
}
