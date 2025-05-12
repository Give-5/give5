import 'package:flutter/foundation.dart'; // For @required

enum UserType { volunteer, organization, incentivizer, unknown }

class ContactInfo {
  final String email;
  final String phone;

  ContactInfo({required this.email, required this.phone});

  factory ContactInfo.fromJson(Map<String, dynamic> json) {
    return ContactInfo(
      email: json['email'] ?? '',
      phone: json['phone'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'phone': phone,
    };
  }
}

class User {
  final String userId;
  final UserType userType;
  final String username;
  final String name;
  final ContactInfo contactInfo;

  User({
    required this.userId,
    required this.userType,
    required this.username,
    required this.name,
    required this.contactInfo,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    UserType type;
    switch (json['userType']?.toLowerCase()) {
      case 'volunteer':
        type = UserType.volunteer;
        break;
      case 'organization':
        type = UserType.organization;
        break;
      case 'incentivizer':
        type = UserType.incentivizer;
        break;
      default:
        type = UserType.unknown; // Handle unexpected values
    }

    return User(
      userId: json['userId'] ?? '',
      userType: type,
      username: json['username'] ?? '',
      name: json['name'] ?? '',
      contactInfo: ContactInfo.fromJson(json['contactInfo'] ?? {}),
    );
  }

   // We don't include passwordHash in toJson for security
  Map<String, dynamic> toJson() {
    return {
      'userId': userId,
      'userType': userType.toString().split('.').last, // 'provider' or 'patient'
      'username': username,
      'name': name,
      'contactInfo': contactInfo.toJson(),
    };
  }
}
