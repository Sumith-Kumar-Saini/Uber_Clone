import { Roles } from "@/types/roles.types";
import { body, ValidationChain } from "express-validator";

class ValidationRules {
  static email(): ValidationChain {
    return body('email').isEmail().withMessage('Invalid email address');
  }

  static password(minLength = 8, isStrong = false): ValidationChain {
    return isStrong
     ? body('password').isStrongPassword({ minLength }).withMessage(`Password must be at least ${minLength} characters long and strong`)
     : body('password').isLength({ min: minLength }).withMessage(`Password must be at least ${minLength} characters long`);
  }

  static Name(field: string): ValidationChain {
    return body(field).isLength({ min: 3 }).withMessage(`${field.split('.').pop()} must be at least 3 characters long`);
  }

  static optionalName(field: string): ValidationChain {
    return body(field).optional().isLength({ min: 3 }).withMessage(`${field.split('.').pop()} must be at least 3 characters long if provided`);
  }

  static vehicleColor() {
    return body('vehicle.color')
     .isLength({ min: 3 })
     .withMessage('Vehicle color must be a valid string and at least 3 characters long');
  }

  static vehiclePlate() {
    return body('vehicle.plate')
      .matches(/^[A-Z0-9-]+$/)
      .withMessage('Invalid vehicle plate number format');
  }

  static vehicleCapacity() {
    return body('vehicle.capacity')
     .isInt({ min: 1 })
     .withMessage('Vehicle capacity must be a positive integer');
  }

  static vehicleType() {
    return body("vehicle.type")
      .isIn(["TwoWheeler", "ThreeWheeler", "FourWheeler"])
      .withMessage(
        "Vehicle type must be one of 'TwoWheeler', 'ThreeWheeler', or 'FourWheeler'"
      );
  }
}

export class AuthValidator {
  static getRules(type: Roles, action: 'register' | 'login'): ValidationChain[] {
    const isRegistration = action === 'register';
    const isCaptain = type === 'captain';

    const rules: ValidationChain[] = [ValidationRules.email(), ValidationRules.password(8, isRegistration)];

    if (isRegistration) {
      rules.push(
        ValidationRules.Name('fullName.firstName'),
        ValidationRules.Name('fullName.lastName')
      );

      if (isCaptain) {
        rules.push(
          ValidationRules.vehicleColor(),
          ValidationRules.vehiclePlate(),
          ValidationRules.vehicleCapacity(),
          ValidationRules.vehicleType()
        );
      }
    }

    return rules;
  }
}