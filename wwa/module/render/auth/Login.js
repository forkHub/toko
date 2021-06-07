"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../../Util");
class Login {
    render() {
        return `
		<!DOCTYPE html>
		<html lang="id">
		
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1">
		
			<link href='/css/bootstrap.min.css' rel='stylesheet' />
			<link href='/css/css_admin.css' rel='stylesheet' />
			
			<script src="/lib/md5.min.js"></script>
			<script type="module" src="/js${Util_1.Util.revisi}/auth/LoginPage.js?r=${Util_1.util.randId}"></script>
		
		</head>
		
		<body>
			<div class='container'>
				<div class='form-login'>
					<h2>Form login</h2>
					<form class='form-login' action="" method="post">
		
						<div class="form-group">
							<label for="user-name">User:</label>
							<input type="text" class="form-control user-name" name="user-name" id="user-name" required
								value="auni" />
						</div>
		
						<div class="form-group">
							<label for="password">Deskripsi:</label>
							<input type="password" class="form-control password" name="password" id="password" required
								value="12345" />
						</div>
						<button type="submit" class="btn btn-primary submit">Login</button>
						<button type="button" class="btn btn-primary lupa">Lupa Password</button>
					</form>
				</div>
			</div>
		
		
		</body>
		
		</html>`.trimStart().trimEnd();
    }
}
exports.Login = Login;
