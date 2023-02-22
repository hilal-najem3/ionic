import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginPageForm } from "./login.page.form";

describe('LoginPageForm', () => {

    let loginPageForm: LoginPageForm;
    let form: FormGroup;

    beforeEach(() => {
        loginPageForm = new LoginPageForm(new FormBuilder);
        form = loginPageForm.createForm();
    });

    it('should create and empty login form', () => {
        expect(form).not.toBeNull();
        expect(form.get('email')).not.toBeNull();
        expect(form.get('email')?.value).toEqual('');
        expect(form.get('email')?.valid).toBeFalsy();
        expect(form.get('password')).not.toBeNull();
        expect(form.get('password')?.value).toEqual('');
        expect(form.get('password')?.valid).toBeFalsy();
    });

    it('should test validations for email', () => {
        let email = form.get('email');

        email?.setValue('invalid email');
        expect(email?.valid).toBeFalsy();

        email?.setValue('@');
        expect(email?.valid).toBeFalsy();

        let emailString = 'veryHugeEmailveryHugeEmailveryHugeEmailveryHugeEmailveryHugeEmailveryHugeEmailveryHugeEmail';
        emailString += '@' + emailString + emailString;
        expect(email?.valid).toBeFalsy();

        email?.setValue('');
        expect(email?.valid).toBeFalsy();

        email?.setValue('a@a');
        expect(email?.valid).toBeTruthy();
    });

    it('should test validations for password', () => {
        let password = form.get('password');

        password?.setValue('aa');
        expect(password?.valid).toBeFalsy();

        password?.setValue('very@goodPassword111');
        expect(password?.valid).toBeTruthy();

        password?.setValue('TOOOOOOOOOOOOOOOOOOOOLOOOOOOOOOOOOOONNNNNNNNNNNNGGGGGGGPASSWOOOOOOOOOOOOOOOOORD');
        expect(password?.valid).toBeFalsy();
    });

    it('should have a valid form', () => {
        let email = form.get('email');
        let password = form.get('password');

        password?.setValue('very@goodPassword111');
        expect(password?.valid).toBeTruthy();

        email?.setValue('valid@email.com');
        expect(email?.valid).toBeTruthy();

        expect(form.valid).toBeTruthy();
    });

});