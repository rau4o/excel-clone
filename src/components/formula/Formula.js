import {ExcelComponent} from "@/core/ExcelComponent";

export class Formula extends ExcelComponent {

    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click', 'keydown'],
            ...options
        });
    }

    init() {
        super.init();
        this.$formula = this.$root.find('#formula')
        this.$on('table:select', $cell => {
            this.$formula.text($cell.text())
        })

        // this.$on('table:input', $cell => {
        //     this.$formula.text($cell.text())
        // })

        this.$subscribe(state => {
            this.$formula.text(state.currentText)
        })
    }

    toHTML() {
        return `
        <div class="info">fx</div>
        <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onClick(event) {
        console.log(event)
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }
}
