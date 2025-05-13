import 'package:flutter/material.dart';
import '../models/user.dart';
import 'volunteer/volunteer_dashboard_screen.dart';
import 'organization/organization_dashboard_screen.dart';
import 'incentivizer/incentivizer_dashboard_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  String? _errorMessage;

  // Placeholder for user type selection - Requirement mentioned buttons,
  // but standard login flow usually determines type after authentication.
  // We'll stick to a single login button for now.
  // UserType _selectedUserType = UserType.volunteer; // Default or based on button tap

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
        _errorMessage = null;
      });

      // --- Placeholder for Authentication Logic ---
      // In a real app, call an AuthService here:
      // try {
      //   User loggedInUser = await AuthService.login(
      //     _usernameController.text,
      //     _passwordController.text,
      //   );
      //
      //   // Navigate based on user type from AuthService response
      //   if (loggedInUser.userType == UserType.provider) {
      //      Navigator.pushReplacement(
      //        context,
      //        MaterialPageRoute(builder: (context) => ProviderDashboardScreen(user: loggedInUser)),
      //      );
      //   } else if (loggedInUser.userType == UserType.volunteer) {
      //      Navigator.pushReplacement(
      //        context,
      //        MaterialPageRoute(builder: (context) => VolunteerDashboardScreen(user: loggedInUser)),
      //      );
      //   } else {
      //      // Handle unknown user type or error
      //      setState(() { _errorMessage = 'Login failed: Unknown user type.'; });
      //   }
      // } catch (e) {
      //   setState(() { _errorMessage = 'Login failed: ${e.toString()}'; });
      // } finally {
      //   setState(() { _isLoading = false; });
      // }
      // --- End Placeholder ---

      // --- Temporary Mock Logic ---
      await Future.delayed(const Duration(seconds: 1)); // Simulate network call
      String username = _usernameController.text.trim().toLowerCase();
      String password = _passwordController.text; // In real app, check password hash

      // Simple mock logic based on username
      UserType mockUserType = UserType.unknown;
      if (username == 'volunteer' && password == 'password') {
         mockUserType = UserType.volunteer;
      } else if (username == 'organization' && password == 'password') {
         mockUserType = UserType.organization;
      } else if (username == 'incentivizer' && password == 'password') {
         mockUserType = UserType.incentivizer;
      }

      setState(() { _isLoading = false; });

      if (mockUserType == UserType.volunteer) {
         // In real app, pass the actual loggedInUser object
         Navigator.pushReplacement(
           context,
           MaterialPageRoute(builder: (context) => const VolunteerDashboardScreen()),
         );
      } else if (mockUserType == UserType.organization) {
         // In real app, pass the actual loggedInUser object
         Navigator.pushReplacement(
           context,
           //MaterialPageRoute(builder: (context) => const OrganizationDashboardScreen()),
           MaterialPageRoute(builder: (context) => const VolunteerDashboardScreen()),
         );
      } else if (mockUserType == UserType.incentivizer) {
         Navigator.pushReplacement(
           context,
           //MaterialPageRoute(builder: (context) => const IncentivizerDashboardScreen()),
           MaterialPageRoute(builder: (context) => const VolunteerDashboardScreen()),
         );
      } else {
         setState(() { _errorMessage = 'Invalid username or password.'; });
      }
      // --- End Temporary Mock Logic ---
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Give 5 Login'),
      ),
      body: Center(
        child: SingleChildScrollView( // Allows scrolling on smaller screens
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                // Placeholder for Logo/App Name
                Text(
                  'Welcome!',
                  style: Theme.of(context).textTheme.headlineMedium,
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 32.0),

                // Username Field
                TextFormField(
                  controller: _usernameController,
                  decoration: const InputDecoration(
                    labelText: 'Username',
                    border: OutlineInputBorder(),
                    prefixIcon: Icon(Icons.person),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your username';
                    }
                    return null;
                  },
                  textInputAction: TextInputAction.next,
                ),
                const SizedBox(height: 16.0),

                // Password Field
                TextFormField(
                  controller: _passwordController,
                  decoration: const InputDecoration(
                    labelText: 'Password',
                    border: OutlineInputBorder(),
                    prefixIcon: Icon(Icons.lock),
                  ),
                  obscureText: true,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your password';
                    }
                    return null;
                  },
                  textInputAction: TextInputAction.done,
                  onFieldSubmitted: (_) => _isLoading ? null : _login(), // Allow login on keyboard done
                ),
                const SizedBox(height: 24.0),

                // Error Message Display
                if (_errorMessage != null)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 16.0),
                    child: Text(
                      _errorMessage!,
                      style: TextStyle(color: Theme.of(context).colorScheme.error),
                      textAlign: TextAlign.center,
                    ),
                  ),

                // Login Button
                _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : ElevatedButton(
                        onPressed: _login,
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 16.0),
                          textStyle: const TextStyle(fontSize: 16),
                        ),
                        child: const Text('Login'),
                      ),

                // Optional: Add Forgot Password or Sign Up links later
              ],
            ),
          ),
        ),
      ),
    );
  }
}
