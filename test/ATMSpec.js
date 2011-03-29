describe("Withdraw money", function() {
	var atm;
	var judyAccountNumber = '1234567890';
	var judyPin = '1234'
	var markAccountNumber = '0987654321';
	var markPin = '1111';

	beforeEach(function() {
		atm = ATM.create();
	});

	describe("Judy withdraws money", function() {
		it("Has a balance of $40 after starting at $50 and removing $10", function() {
			atm.bank.setBalance(50);
			atm.withdraw(10, judyAccountNumber, judyPin);
			expect(atm.checkBalance(judyAccountNumber, judyPin)).toEqual(40);
		});

		it("Lets Judy withdraw $10 when she has $20 in her account", function() {
			atm.bank.setBalance(20);
			expect(atm.withdraw(10, judyAccountNumber, judyPin)).toEqual(10);
		});

		it("Prevents Judy from withdrawing if she enters an invalid pin (5678)", function() {
			atm.bank.setBalance(20);
			var withdrawn = atm.withdraw(10, judyAccountNumber, '5678');
			expect(withdrawn).toEqual(0);
		});

		it("Prevents Judy from withdrawing if she enters an invalid pin (9999)", function() {
			atm.bank.setBalance(20);
			var withdrawn = atm.withdraw(10, judyAccountNumber, '9999');
			expect(withdrawn).toEqual(0);
		});

		it("Prevents Judy from withdrawing $10 when she has $5 in her account", function() {
			atm.bank.setBalance(5);
			expect(atm.withdraw(10, judyAccountNumber, judyPin)).toEqual(0);
		});

		it("Prevents Judy from withdrawing if she enters an invalid account number", function() {
			atm.bank.setBalance(20);
			var withdrawn = atm.withdraw(10, '9999999999', judyPin);
			expect(withdrawn).toEqual(0);
		});
	});

	describe("Mark withdraws money", function() {
		it("Lets Mark withdraw $10", function() {
			atm.bank.setBalance(20);
			var withdrawn = atm.withdraw(10, markAccountNumber, markPin);
			expect(withdrawn).toEqual(10);
		});
	/*	
		it("Doesn't take money from Judy when Mark withdraws", function() {
			atm.bank.accounts[markAccountNumber].balance = 100;
			atm.bank.accounts[judyAccountNumber].balance = 100;

			atm.withdraw(50, markAccountNumber, markPin);
			expect(atm.bank.accounts[judyAccountNumber].balance).toEqual(100); 
		});
		*/
	});
});
