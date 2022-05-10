import {capitalize} from "@/core/utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for Dom listner')
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} not implemented in ${this.name || ''} Component`)
            }
            this[method] = this[method].bind(this)
                // Тоже самое , что и addEventListener
            this.$root.on(listener, this[method])
        })
    }

    removeDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}
