const PopUpSignUpForm = () =>{
    return(
        <section className = "text-center m-3">
            <div>
                <h2>Welcome to Sign Up Form</h2>
                <form action="/" method="get">
                    <div>
                        <label for="name">Username</label>
                        <input type="text" name="userName" placeholder="Input Username" required/>
                    </div>
                    <div>
                        <label for="email">email</label>
                        <input type="email" name="email" placeholder="Enter your email address" required/>
                    </div>
                    <div>
                        <label for="email">Re-enter email</label>
                        <input type="email" name="email" placeholder="Re-enter your email address" required/>
                    </div>
                    <div>
                        <label for ="password">Password: </label>
                        <input type="text" name="password" placeholder="Input Password" required/>
                    </div>
                    <div>
                        <label for ="password">Re-enter Password: </label>
                        <input type="text" name="password" placeholder="Re-enter Password" required/>
                    </div>
                    <div>
                        <input type="submit" value="Sign UP"/>
                    </div>
                </form>
            </div>
    </section>  
    );
}

export default PopUpSignUpForm;