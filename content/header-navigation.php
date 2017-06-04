	<!-- HEADER -->
	<header>
		<a href="index.php" class="mobile-logo"><img class="logo" src="img/site-layout/logo.svg" alt="Techtalks logo"></a>


		<!-- MAIN NAVIGATION -->
		<nav class="flex-nav">
			<a href="#" class="toggleNav"><div class="fa fa-bars" aria-hidden="true"></div> Menu</a>


			<ul>
				<li class="pc-logo"><a href="index.php"><img src="img/site-layout/logo.svg"></a></li>
				
				<?php
				if(isset($_SESSION['email'])){
					if( $_SESSION['ar'] > 4){
						?>
						<li><a href="./admin-index.php">Admin home</a></li>
						<?php
					}
				}
				?>
				<li><a class="link" data-go-to="section-events">Events</a></li>
				<li><a class="link" data-go-to="section-our-partners">Our partners</a></li>
				<li><a class="link" id="header-contact-link" data-popup="section-contact-us">Contact us</a></li>

				<?php
				if (!isset($_SESSION['email'])) {
					?>		
					<li><a class="link" id="header-register-link" data-popup="section-register">Register</a></li>	
					<li><a id="header-login-link" class="link" data-popup="section-login">Login</a></li>
					<?php
				} else{
					?>	
					<li><a id="header-logout-link" class="link">Logout</a></li>	
					<?php
				}
				?>	
				<li class="header-search-bar">
					<!-- SEARCH BAR-->
					<form id="search-bar-header" class="search-bar-form">
						<div>
							<div class="search-input-container" data-search-state="hidden">
								<input id="search-input-text-pc" type="text" placeholder="Search here...">
							</div>
							<div class="search-icon-button hover">
								<div class="search-icon fa fa-search"></div>
							</div>
						</div>
					</form>
				</li>
			</ul>
		</nav>		

		<!-- SEARCH BAR-->
		<div class="header-search-bar-mobile">
			<form id="search-bar-header" class="search-bar-form">
				<div>
					<div class="search-input-container">
						<input id="search-input-text-mobile" type="text" placeholder="Search here...">
					</div>
					<div class="search-icon-button hover">
						<div class="search-icon fa fa-search"></div>
					</div>
				</div>
			</form>
		</div>
	</header>