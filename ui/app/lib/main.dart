import 'package:flutter/material.dart';
import 'screens/login_screen.dart';
import 'screens/volunteer/volunteer_dashboard_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Give 5',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
        // Optional: Define common input decoration theme
        inputDecorationTheme: const InputDecorationTheme(
          border: OutlineInputBorder(
             borderRadius: BorderRadius.all(Radius.circular(8.0)),
          ),
          contentPadding: EdgeInsets.symmetric(vertical: 12.0, horizontal: 16.0),
        ),
         // Optional: Define common button theme
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8.0),
            ),
            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 12.0),
          ),
        ),
      ),
      // Start on the Login Screen
      home: const LoginScreen(),
      // Define routes for navigation (optional but good practice)
      routes: {
        '/login': (context) => const LoginScreen(),
        '/volunteer_dashboard': (context) => const VolunteerDashboardScreen(),
        // Add routes for other screens like organization and incentivizer later
      },
      debugShowCheckedModeBanner: false, // Hide debug banner
    );
  }
}
