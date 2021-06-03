export class ToNavigate {
  static redirectDependsOnRole(role: string): string {
    switch (role) {
      case 'Admin':
        return '/member/users';
      case 'Manager':
        return '/member/projects';
      case 'Employee':
        return '/member/task/employee';
    }
  }
}
