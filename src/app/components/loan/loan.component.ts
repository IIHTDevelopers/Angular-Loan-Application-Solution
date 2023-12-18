import { Component } from '@angular/core';

export interface Loan {
  id: number;
  customerName: string;
  amount: number;
  interestRate: number;
  durationMonths: number;
}

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent {
  loans: Loan[] = [];
  newLoan: Loan = {} as Loan;
  editedLoan: Loan = {} as Loan;
  isEditing = false;
  searchKeyword = '';

  addLoan(): void {
    this.newLoan.id = this.loans.length + 1;
    this.loans.push({ ...this.newLoan });
    this.newLoan = {} as Loan;
  }

  editLoan(loan: Loan): void {
    this.isEditing = true;
    this.editedLoan = { ...loan };
  }

  saveEditedLoan(): void {
    const index = this.loans.findIndex(loan => loan.id === this.editedLoan.id);
    if (index !== -1) {
      this.loans[index] = { ...this.editedLoan };
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedLoan = {} as Loan;
  }

  deleteLoan(loan: Loan): void {
    this.loans = this.loans.filter(item => item.id !== loan.id);
  }

  get filteredLoans(): Loan[] {
    return this.loans.filter(loan =>
      loan.customerName.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
