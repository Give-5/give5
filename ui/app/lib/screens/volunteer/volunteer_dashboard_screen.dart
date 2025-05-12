import 'package:flutter/material.dart';
import 'dart:async'; // For Timer
// import '../../models/user.dart';

class VolunteerDashboardScreen extends StatefulWidget {

  const VolunteerDashboardScreen({Key? key}) : super(key: key); // Temporary

  @override
  VolunteerDashboardScreenState createState() => _VolunteerDashboardScreenState();
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
                    children: _isPreoperative
                        ? _buildPreoperativeView()
                        : _buildPostoperativeView(),
                  ),
                ),
       floatingActionButton: !_isPreoperative ? FloatingActionButton.extended(
            onPressed: _submitQuestion,
            icon: const Icon(Icons.question_answer),
            label: const Text("Ask Provider"),
        ) : null, // Only show FAB in post-op
    );
  }

  // --- Preoperative View Builder ---
  List<Widget> _buildPreoperativeView() {
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

      // Checklist
      Text('Preparation Checklist', style: Theme.of(context).textTheme.titleLarge),
      const SizedBox(height: 8),
      Card(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0),
          // TODO: Replace with interactive CheckboxListTiles if needed
          child: ListView.builder(
            shrinkWrap: true, // Important inside another ListView
            physics: const NeverScrollableScrollPhysics(), // Disable inner scrolling
            itemCount: _mockChecklist.length,
            itemBuilder: (context, index) {
              return ListTile(
                leading: const Icon(Icons.check_box_outline_blank), // Placeholder icon
                title: Text(_mockChecklist[index]),
                // onTap: () => // Handle check/uncheck logic
              );
            },
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

  // --- Postoperative View Builder ---
  List<Widget> _buildPostoperativeView() {
    return [
      // Recovery Day Count & Message
      Card(
        elevation: 2,
        color: Colors.blueAccent.withOpacity(0.1),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              Text(
                'Day X of volunteering',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                "Keep up the great work! Remember to follow your instructions.", // Supportive message placeholder
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
      const SizedBox(height: 20),

      // Daily Check-in Button
      ElevatedButton.icon(
        onPressed: _doDailyCheckIn,
        icon: const Icon(Icons.checklist_rtl),
        label: const Text('Do Your Daily Check-in'),
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 16.0),
          textStyle: const TextStyle(fontSize: 16),
          minimumSize: const Size.fromHeight(50), // Make button prominent
        ),
      ),
      const SizedBox(height: 20),

      // Key Metrics Visualization
      Text('Your Key Metrics', style: Theme.of(context).textTheme.titleLarge),
      const SizedBox(height: 8),
      GridView.builder(
        shrinkWrap: true, // Important inside ListView
        physics: const NeverScrollableScrollPhysics(), // Disable inner scrolling
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2, // 2 columns
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
          childAspectRatio: 1.2, // Adjust aspect ratio as needed
        ),
        itemCount: _mockKeyMetrics.length,
        itemBuilder: (context, index) {
          final metric = _mockKeyMetrics[index];
          return Card(
            elevation: 1,
            child: InkWell( // Make card tappable
              onTap: () => _viewMetricDetails(metric['name'], metric['data']),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      metric['name'],
                      style: Theme.of(context).textTheme.titleSmall,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    // TODO: Replace Text with a small chart/visualization later
                    Text(
                      metric['value'].toString(),
                      style: Theme.of(context).textTheme.headlineSmall,
                      textAlign: TextAlign.center,
                    ),
                     const SizedBox(height: 4),
                     const Text(
                      "(Tap for details)", // Hint for interaction
                       style: TextStyle(fontSize: 10, color: Colors.grey),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
       const SizedBox(height: 20),
       // TODO: Add section for viewing past check-ins (using ListView/ExpansionPanelList)
       // TODO: Add section for viewing provider instructions
       // Example:
       // ExpansionTile(
       //    title: Text("View Past Check-ins"),
       //    children: [ /* Build list of past check-ins here */ ]
       // )
       const SizedBox(height: 60), // Add padding at bottom for FAB
    ];
  }
}
