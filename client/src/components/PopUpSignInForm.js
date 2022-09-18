const PopUpSignInForm = () =>{
    return (
        <div>
            <h2>Welcome to Sign in Form</h2>
            <form action="/" method="get">
                <label for="name">Username</label>
                <input type="text" name="userName" placeholder="Input Username" required/>
                <label for ="password">Password</label>
                <input type="text" name="password" placeholder="Input Password" required/>
                <input type="submit" value="Submit"/>
            </form>
        </div>

    );
}
export default PopUpSignInForm;