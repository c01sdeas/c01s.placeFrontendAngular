import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        © {{ currentYear }} c01splace
    </div>`
})
export class AppFooter {
    currentYear: number = new Date().getFullYear();
}
