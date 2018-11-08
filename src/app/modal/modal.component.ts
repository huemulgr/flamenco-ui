import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-modal',
    template: 
        `<div class="app-modal">
            <div class="app-modal-body">
                <ng-content></ng-content>
            </div>
        </div>
        <div class="app-modal-background"></div>`,
    styleUrls: ['./modal.component.css']    
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    @Input() block: boolean;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        this.element.style.display = 'none';
        
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        if(!this.block) {
            this.element.addEventListener('click', function (e: any) {
                if (e.target.className === 'app-modal-background') {
                    modal.close();
                }
            });
        }
        
        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('app-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('app-modal-open');
    }
}