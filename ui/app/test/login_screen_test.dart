import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:app/main.dart';

void main() {
  testWidgets('Login screen loads', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());
    // Verify that our login screen has a username and password field
    expect(find.text('Username'), findsOneWidget);
    expect(find.text('Password'), findsOneWidget);
    expect(find.text('Login'), findsOneWidget);
  });

  testWidgets('Able to login as volunteer', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());
    // Verify that can login as volunteer
    Finder userField = find.widgetWithText(TextFormField, 'Username');
    await tester.enterText(userField, 'volunteer');
    Finder passField = find.widgetWithText(TextFormField, 'Password');
    await tester.enterText(passField, 'password');
    await tester.tap(find.text('Login'));
    await tester.pumpAndSettle();
    expect(find.text('Login'), findsNothing);
    expect(find.text('Volunteer Dashboard'), findsOneWidget);
  });
}
