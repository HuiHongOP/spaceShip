const PopUpSignInForm = () =>{
    return (
        <section className = "text-center m-3">
            <div>
                <h2>Welcome to Sign in Form</h2>
                <form action="/" method="get">
                    <div>
                        <label for="name">Username</label>
                        <input type="text" name="userName" placeholder="Input Username" required/>
                    </div>
                    <div>
                        <label for ="password">Password</label>
                        <input type="text" name="password" placeholder="Input Password" required/>
                    </div>
                    <div>
                        <input type="text" name="password" placeholder="Input Password" required/>
                        <input type="submit" value="Login"/>
                    </div>
                </form>
            </div>
        </section>
    );
}
export default PopUpSignInForm;