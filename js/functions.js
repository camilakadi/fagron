var app = angular.module("listClients", ['ui.utils.masks']);

app.filter('cpfFormated', function() {
	return function(input) {
		var str = input + '';
		if(str.length <= 11){
			str = str.replace(/\D/g, '');
			str = str.replace(/(\d{3})(\d)/, "$1.$2");
			str = str.replace(/(\d{3})(\d)/, "$1.$2");
			str = str.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
		}
		return str;
	};
});

app.filter('ageFilter', function(){
	return function(birthday){
		var birthday = new Date(birthday);
		var today = new Date();
		var age = ((today - birthday) / (31557600000));
		var age = Math.floor( age );
		return age;
	}
});

app.controller("listClientsCtrl", function ($scope) {
	$scope.title = "Clientes";
	$scope.client = {};
	var id = 4;

	$scope.persons = [
		{
			id: 1,
			name: "Camila",
			lastName: "Kadi",
			cpf: "41625429886",
			birthDate: "1992-10-14T03:00:00.000Z",
			profession: "Programador"
		},
		{
			id: 2,
			name: "Matheus",
			lastName: "Moreira",
			cpf: "41846014808",
			birthDate: "1993-04-30T03:00:00.000Z",
			profession: "Programador"
		},
		{
			id: 3,
			name: "Solange",
			lastName: "Kadi",
			cpf: "10233796860",
			birthDate: "1968-02-26T03:00:00.000Z",
			profession: ""
		}
	];

	$scope.addClient = function () {
		//caso não exista um ID vai ser criado um novo cliente
		if (!$scope.client.id) {
			$scope.client.id = id;

            $scope.persons.push(angular.copy($scope.client));
			$scope.client = {};

            id++;
		}
		else {
			//caso exista o ID vai editar o cliente
			var indexEdited = $scope.persons.findIndex(obj => obj.id == $scope.client.id);
			$scope.persons[indexEdited] = $scope.client;
			$scope.client = {};
		}
	}

	$scope.deleteClient = function (line) {
		var index = $scope.persons.indexOf(line);
		$scope.persons.splice(index, 1);
	}

	$scope.editClient = function (line) {
		$scope.client = angular.copy(line);
	}

	$scope.closeClient = function () {
		$scope.client = {};
	}
});