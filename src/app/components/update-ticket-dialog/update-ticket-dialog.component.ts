import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketService } from 'src/app/_services/ticket.service';

@Component({
  selector: 'app-update-ticket-dialog',
  templateUrl: './update-ticket-dialog.component.html',
  styleUrls: ['./update-ticket-dialog.component.css']
})
export class UpdateTicketDialogComponent implements OnInit {

  form;

  constructor(private dialogRef: MatDialogRef<UpdateTicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private ticketService : TicketService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      description : [this.data.description,Validators.required]
    });

  }

  close() {
    this.dialogRef.close(false);
  }

  submit(){

    if (this.form.valid){
      
      let ticketdata = {
        "id": this.data.ticketId,
        "description": this.form.get("description").value
      };
      
      this.ticketService.updateTicket(ticketdata).subscribe(
        data => {
          this.dialogRef.close(true);
        }
      );
      
    }
  }

  get description(){return this.form.get("description");}

}
