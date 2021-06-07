"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../../Util");
class Lupa {
    render() {
        return `
		<!DOCTYPE html>
		<html lang="id">
		
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1">
			
				<link href='/css/bootstrap.min.css' rel='stylesheet' />
				<link href='/css/css_admin.css' rel='stylesheet' />
				
				<script src="/lib/md5.min.js"></script>
				<script type="module" src="/js${Util_1.Util.revisi}/auth/LupaPage.js?r=${Util_1.util.randId}"></script>
			
			</head>
			
			<body>
				<div class='container'>
					<div class='form form-lupa'>
						<h2>Form Lupa Password</h2>
						<form class='form-lupa' action="" method="post">

							<div class="form-group">
								<label for="user-name">Email:</label>
								<input type="email" class="form-control email" name="email" id="email" required value="" placeholder="email"/>
							</div>

							<button type="submit" class="btn btn-primary submit">Kirim</button>
						</form>
					</div>
				</div>
			</body>
		
		</html>`.trimStart().trimEnd();
    }
}
exports.Lupa = Lupa;
