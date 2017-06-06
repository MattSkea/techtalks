
<!-- HEADER -->
<header>
	<a href="./index.php" class="mobile-logo"><img class="logo" src="./img/site-layout/logo.svg" alt="Techtalks logo"></a>


	<!-- MAIN NAVIGATION -->
	<nav class="flex-nav">
		<a href="#" class="toggleNav"><div class="fa fa-bars" aria-hidden="true"></div> Menu</a>


		<ul>
			<li class="pc-logo"><a href="./index.php"><img src="./img/site-layout/logo.svg"></a></li>
			<li><a href="./admin-index.php">Admins home</a></li>
			<li><a class="link" data-go-to="section-admin-events">Events</a></li>
			<li><a data-go-to="section-partners">Partners</a></li>
			<!-- <li><a class="link" data-go-to="section-users">Users</a></li> -->

			<li><a id="header-logout-link" class="link">Logout</a></li>
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
