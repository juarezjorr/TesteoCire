
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">CTT Exp & Rentals</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>


					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">

							<?php 
								while ($row = $menu->fetch_assoc()){
									echo '<li class="nav-item"><a class="nav-link" aria-current="page" href="' . $row['mod_item'] .'/' . $row['mod_item'] . '">' . $row['mnu_item'] . '</a></li>';
								}
							?>
						</ul>
						<span class="navbar-text user-sign-out"></span>
					</div>
				</div>
			</nav>

	
