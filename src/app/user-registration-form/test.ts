this.fetchApiData
  .userRegistration({ Username, Password, Email, Birthday })
  .subscribe({
    next: (result: any) => {
      // Call the userLogin method with the new user's credentials
      this.fetchApiData.userLogin({ Username, Password }).subscribe({
        next: (result: any) => {
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('token', result.token);
          this.dialogRef.close();
          this.snackBar.open('Logged in successfully!', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['movies']);
        },
        error: (error: any) => {
          // Handle login error
          const errorMessage = error.error.message || 'Unknown error occurred!';
          this.snackBar.open(errorMessage, 'OK', { duration: 2000 });
        },
        complete: () => {
          console.log('Observable completed');
        },
      });
    },
    error: (error: any) => {
      const errorMessage = error.error.message || 'Unknown error occurred!';
      this.snackBar.open(errorMessage, 'OK', { duration: 2000 });
    },
    complete: () => {
      console.log('Observable completed');
    },
  });
