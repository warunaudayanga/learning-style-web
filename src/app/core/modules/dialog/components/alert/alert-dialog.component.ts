import { Component, EventEmitter, Inject, Output } from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from "@angular/material/dialog";
import { AlertData } from "../../interfaces";
import { getIconAndColor } from "../../utils";
import { MatDivider } from "@angular/material/divider";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-alert-dialog",
    templateUrl: "./alert-dialog.component.html",
    styleUrls: ["../common.scss", "./alert-dialog.component.scss"],
    imports: [MatDialogContent, MatDivider, MatDialogActions, MatDialogTitle, NgIf],
})
export class AlertDialogComponent {
    @Output() emitter: EventEmitter<boolean> = new EventEmitter();

    public style: { icon: string; colorClass: string };

    constructor(
        @Inject(MAT_DIALOG_DATA) public alertData: AlertData,
        private readonly dialogRef: MatDialogRef<boolean>,
    ) {
        this.style = getIconAndColor(alertData);
    }

    confirm(): void {
        this.dialogRef.close(true);
    }

    close(): void {
        this.dialogRef.close(!this.alertData.confirm);
    }
}
