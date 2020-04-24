import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

// Middleware to prottect route
const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } else {
    res.status(403).send('Not permitted.');
  }
};

const router = Router();

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <h1>You are logged in</h1>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <h1>You are not log in</h1>
        <a href="/login">Please log in</a>
      </div>
    `);
  }
});

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <div>
      <h1>Please Login</h1>
      <form action="" method="POST">
        <div>
          <label for="email">Email</label>
          <input name="email" type="email" />
        </div>
        <div>
          <label for="email">Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    </div>
    `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'test@test.com' && password === '1234') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route');
});

export { router };
