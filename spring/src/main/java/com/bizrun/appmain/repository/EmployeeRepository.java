package com.bizrun.appmain.repository;

import com.bizrun.appmain.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByLoginNameAndPassword(String loginName, String password);
}
