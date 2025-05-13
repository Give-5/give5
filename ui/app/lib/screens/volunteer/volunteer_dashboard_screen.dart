import 'package:flutter/material.dart';
import 'dart:async'; // For Timer
// import '../../models/user.dart';

class VolunteerDashboardScreen extends StatefulWidget {

  const VolunteerDashboardScreen({Key? key}) : super(key: key); // Temporary

  @override
  _VolunteerDashboardScreenState createState() => _VolunteerDashboardScreenState();
}

class _VolunteerDashboardScreenState extends State<VolunteerDashboardScreen> {
  // --- State Variables ---
  bool _isLoading = true;
  dynamic _volunteerData; // Replace 'dynamic' with VolunteerData model later
  String? _errorMessage;
  bool _isPreoperative = true; // Determine based on fetched data
  Duration? _timeUntilOperation;
  Timer? _countdownTimer;

  // Mock Data (replace with actual fetched data)
  final DateTime _mockOperationDate = DateTime.now().add(const Duration(days: 5, hours: 3));
  final dynamic _mockKeyMetrics = [
    {'name': 'hours_volunteered', 'value': 5},
    {'name': 'friends', 'value': 9001},
  ];


  @override
  void initState() {
    super.initState();
    _fetchVolunteerData();
  }

  @override
  void dispose() {
    _countdownTimer?.cancel(); // Clean up timer
    super.dispose();
  }

  Future<void> _fetchVolunteerData() async {
    setState(() { _isLoading = true; _errorMessage = null; });

    // --- Mock Logic ---
    await Future.delayed(const Duration(seconds: 1));
    _volunteerData = {'mock': 'data'}; // Assign some mock data structure if needed
    setState(() { _isLoading = false; });
    // --- End Mock Logic ---
  }

  void _startCountdown(DateTime operationDate) {
    _countdownTimer?.cancel(); // Cancel existing timer if any
    _updateCountdown(operationDate); // Initial update

    _countdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
       _updateCountdown(operationDate);
    });
  }

   void _updateCountdown(DateTime operationDate) {
       if (!mounted) { // Check if the widget is still in the tree
           _countdownTimer?.cancel();
           return;
       }
   }

  String _formatDuration(Duration duration) {
    if (duration.isNegative || duration == Duration.zero) return "Operation day is here or has passed!";

    String twoDigits(int n) => n.toString().padLeft(2, '0');
    final days = duration.inDays;
    final hours = twoDigits(duration.inHours.remainder(24));
    final minutes = twoDigits(duration.inMinutes.remainder(60));
    final seconds = twoDigits(duration.inSeconds.remainder(60));

    if (days > 0) {
      return "$days days, $hours:$minutes:$seconds";
    } else {
      return "$hours:$minutes:$seconds";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Title changes based on stage
        title: Text('Volunteer Dashboard'),
         actions: [
           IconButton( // Simple Logout for now
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
            onPressed: () {
              _countdownTimer?.cancel(); // Stop timer on logout
              Navigator.pushReplacementNamed(context, '/login');
            },
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _errorMessage != null
              ? Center(child: Text(_errorMessage!, style: TextStyle(color: Theme.of(context).colorScheme.error)))
              : RefreshIndicator( // Allow pull-to-refresh
                  onRefresh: _fetchVolunteerData,
                  child: ListView( // Use ListView for scrollable content
                    padding: const EdgeInsets.all(16.0),
                    children: _buildDashboardView()
                  ),
                ),
    );
  }

  List<Widget> _buildDashboardView() {
    return [
      // Countdown Timer
      Card(
        elevation: 2,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              Text(
                'Time Until Operation',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 8),
              Text(
                _timeUntilOperation != null
                    ? _formatDuration(_timeUntilOperation!)
                    : 'Calculating...',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
      const SizedBox(height: 20),

      // Recovery Info / Procedure Details (Based on Requirements)
      Text('Information', style: Theme.of(context).textTheme.titleLarge),
       const SizedBox(height: 8),
       Card(
         child: Padding(
           padding: const EdgeInsets.all(16.0),
           child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
             children: [
                // Placeholder buttons from mockups
                 ElevatedButton.icon(
                     onPressed: () { /* TODO: Show procedure details */ },
                     icon: const Icon(Icons.info_outline),
                     label: const Text("Procedure Details"),
                     style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(40)), // Full width
                 ),
                 const SizedBox(height: 10),
                 ElevatedButton.icon(
                     onPressed: () { /* TODO: Show recovery timeline */ },
                     icon: const Icon(Icons.timeline),
                     label: const Text("Expected Recovery Timeline"),
                     style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(40)), // Full width
                 ),
                 const SizedBox(height: 10),
                 // Display recoveryInfo string if available in real data
             ],
           ),
         ),
       ),
    ];
  }
}
